import { NextRequest, NextResponse } from 'next/server'
import { STORE_PRODUCTS } from '@/lib/seed/store-products'
import { createClient } from '@supabase/supabase-js'

const SERP_API_KEY = process.env.SERPAPI_KEY

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'fallback-for-ci',
  { auth: { persistSession: false } }
)

const cache = new Map<string, { data: SerpProduct[]; ts: number }>()
const CACHE_TTL = 3_600_000
const FETCH_IN_FLIGHT = new Map<string, Promise<SerpProduct[]>>()

interface SerpShoppingResult {
  title: string
  price: string
  source: string
  link?: string
  thumbnail?: string
  rating?: number
  reviews?: string
}

interface SerpResponse {
  shopping_results?: SerpShoppingResult[]
  error?: string
}

interface SerpProduct {
  product_name: string
  product_type: string
  brand: string
  price_range: string
  store_type: 'general' | 'agro'
  unit: string
  link?: string
}

const UNIT_PATTERNS = [
  /(\d+\s*(?:L|litre|liter|ml))/i,
  /(\d+\s*(?:kg|g|gram|gm))/i,
  /(\d+\s*(?:piece|pc|strip|tablet|tab))/i,
  /(\d+\s*(?:bottle|packet|bag|can|tin))/i,
]

function extractUnit(name: string): string {
  for (const p of UNIT_PATTERNS) {
    const m = name.match(p)
    if (m) return m[1]
  }
  return '1 unit'
}

function classifyProduct(name: string): string {
  const l = name.toLowerCase()
  if (l.includes('fungicide') || l.includes('tebuconazole') || l.includes('propiconazole') || l.includes('mancozeb') || l.includes('hexaconazole') || l.includes('sulphur') || l.includes('copper') || l.includes('carbendazim')) return 'fungicide'
  if (l.includes('insecticide') || l.includes('imidacloprid') || l.includes('cypermethrin') || l.includes('spinosad') || l.includes('lambda') || l.includes('emamectin') || l.includes('chlorpyrifos') || l.includes('acephate') || l.includes('acetamiprid') || l.includes('dimethoate')) return 'insecticide'
  if (l.includes('bio') || l.includes('organic') || l.includes('neem') || l.includes('verticillium') || l.includes('beauveria') || l.includes('trichoderma') || l.includes('bacillus') || l.includes('metarhizium') || l.includes('predator') || l.includes('parasitoid')) return 'bio-control'
  if (l.includes('trap') || l.includes('lure') || l.includes('pheromone') || l.includes('sticky')) return 'trap'
  if (l.includes('pesticide') || l.includes('herbicide') || l.includes('weed')) return 'pesticide'
  if (l.includes('fungicide') || l.includes('insecticide')) return l.includes('fungicide') ? 'fungicide' : 'insecticide'
  return 'other'
}

function extractBrand(name: string, source: string): string {
  const KNOWN_BRANDS = ['bayer', 'syngenta', 'rallis', 'upl', 'coromandel', 'godrej', 't stanes', 'koppert', 'iffco', 'nagur', 'atan', 'atgc', 'dow', 'dupont', 'fmc', 'adama', 'basf', 'sumitomo', 'meghmani', 'gharda', 'pi industries', 'dharmaj']
  const lowered = name.toLowerCase()
  for (const brand of KNOWN_BRANDS) {
    if (lowered.includes(brand)) return brand.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  }
  if (source) return source
  return 'Various'
}

function formatPrice(priceStr: string, unit: string): string {
  const cleaned = priceStr.replace(/[^0-9.,]/g, '').replace(/,/g, '')
  const num = parseFloat(cleaned)
  if (isNaN(num)) return priceStr
  const low = Math.round(num * 0.85)
  const high = Math.round(num * 1.15)
  return `₹${low}–₹${high}/${unit.includes('piece') || unit.includes('strip') || unit.includes('tablet') ? 'piece' : unit}`
}

function determineStoreType(name: string, source: string): 'general' | 'agro' {
  const AGRO_SOURCES = ['agro', 'agriculture', 'farm', 'krishi', 'kisan', 'pesticide', 'insecticide']
  const l = `${name} ${source}`.toLowerCase()
  for (const s of AGRO_SOURCES) {
    if (l.includes(s)) return 'agro'
  }
  return 'general'
}

async function searchSerpApi(pestName: string, districtName?: string): Promise<SerpProduct[]> {
  const cacheKey = `serp:${pestName.toLowerCase()}:${districtName || ''}`

  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.ts < CACHE_TTL) return cached.data

  if (FETCH_IN_FLIGHT.has(cacheKey)) return FETCH_IN_FLIGHT.get(cacheKey)!

  const promise = (async () => {
    try {
      const q = districtName ? `${pestName} in ${districtName} India` : `${pestName} control India`
      const params = new URLSearchParams({
        engine: 'google_shopping',
        q,
        api_key: SERP_API_KEY!,
        gl: 'in',
        hl: 'en',
        num: '20',
      })

      const res = await fetch(`https://serpapi.com/search?${params}`, { signal: AbortSignal.timeout(8000) })
      if (!res.ok) throw new Error(`SerpAPI ${res.status}`)

      const json: SerpResponse = await res.json()
      if (json.error) throw new Error(json.error)
      if (!json.shopping_results?.length) return []

      const products: SerpProduct[] = json.shopping_results
        .filter(r => isAgriProduct(r.title, r.source))
        .map((r) => {
        const product_name = r.title
        const unit = extractUnit(product_name)
        const product_type = classifyProduct(product_name)
        const price_range = formatPrice(r.price, unit)
        const brand = extractBrand(product_name, r.source)
        const store_type = determineStoreType(product_name, r.source)

        return { product_name, product_type, brand, price_range, store_type, unit, link: r.link }
      })

      const seen = new Set<string>()
      const unique = products.filter(p => {
        const key = p.product_name.toLowerCase()
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })

      cache.set(cacheKey, { data: unique, ts: Date.now() })
      return unique
    } catch {
      return []
    } finally {
      FETCH_IN_FLIGHT.delete(cacheKey)
    }
  })()

  FETCH_IN_FLIGHT.set(cacheKey, promise)
  return promise
}

const MEDICAL_KEYWORDS = /tablet|capsule|syrup|suspension|injection|medicin|pharmacy|toothpaste|toothbrush|stabilizer|water.?purifier|cap |tab |red.?gel|rat.?repellent|dabur|1mg|apollo247|pharmeasy|blinkit|jiomart|amazon|truemeds|medplusmart|chemist180|kogland/i

const AGRI_KEYWORDS = /insecticid|fungicid|pesticid|acaricide|nematicid|bio.?control|neem|pheromone|trap|imida|cyper|spino|lambda|emamectin|chlorpyrifos|acephate|acetamiprid|dimethoate|tebuconazol|propiconazol|mancozeb|hexaconazol|carbendazim|chlorothalonil|sulphur|copper|spray|seed.?treatment|growth|fertilizer|npk|biocontrol|verti|beauveria|trichoderma|bacillus|metarhizium/i

function isAgriProduct(name: string, source: string): boolean {
  const l = `${name} ${source}`.toLowerCase()
  if (MEDICAL_KEYWORDS.test(l)) return false
  if (AGRI_KEYWORDS.test(l)) return true
  if (l.includes('agro') || l.includes('kisan') || l.includes('krishi') || l.includes('farm') || l.includes('crop') || l.includes('rythu') || l.includes('bighaat')) return true
  if (source.toLowerCase().includes('amazon') || source.toLowerCase().includes('flipkart')) {
    return AGRI_KEYWORDS.test(name.toLowerCase())
  }
  return false
}

const PEST_TO_SEARCH: Record<string, string> = {
  wheat_rust: 'buy fungicide for wheat rust',
  yellow_rust: 'buy fungicide for yellow rust',
  stripe_rust: 'buy fungicide for stripe rust',
  brown_plant_hopper: 'buy insecticide for brown plant hopper',
  rice_leaf_folder: 'buy insecticide for rice leaf folder',
  rice_stem_borer: 'buy insecticide for rice stem borer',
  rice_blast: 'buy fungicide for rice blast',
  bacterial_leaf_blight: 'buy bactericide for bacterial leaf blight',
  pink_bollworm: 'buy insecticide for pink bollworm cotton',
  fall_armyworm: 'buy insecticide for fall armyworm maize',
  pod_borer: 'buy insecticide for pod borer',
  aphids: 'buy insecticide for aphids on crops',
  fruit_fly: 'buy fruit fly trap lure',
  leaf_miner: 'buy insecticide for leaf miner',
  thrips: 'buy insecticide for thrips',
  whitefly: 'buy insecticide for whitefly',
  mite: 'buy acaricide for mite control',
  nematode: 'buy nematicide for root knot nematode',
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const districtId = searchParams.get('district_id')
  const pestName = searchParams.get('pest_name')

  let districtName = ''
  if (districtId) {
    const { data } = await supabase
      .from('districts')
      .select('name_en')
      .eq('id', Number(districtId))
      .maybeSingle()
    if (data) districtName = data.name_en
  }

  const pestKey = pestName
    ?.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '') || ''

  let products: SerpProduct[] | null = null

  if (SERP_API_KEY && pestKey && pestKey !== 'none') {
    const searchTerm = PEST_TO_SEARCH[pestKey] || `${pestKey.replace(/_/g, ' ')} control`
    products = await searchSerpApi(searchTerm, districtName || undefined)
  }

  if (!products || products.length === 0) {
    const fallback = STORE_PRODUCTS

    if (pestKey) {
      const pestProducts = fallback.filter(p => p.pest_key === pestKey)
      if (pestProducts.length > 0) {
        products = pestProducts
      } else {
        const partial = fallback.filter(p =>
          pestKey.includes(p.pest_key) || p.pest_key.includes(pestKey)
        )
        products = partial.length > 0 ? partial : fallback.filter(p => p.pest_key === 'general')
      }
    } else {
      products = fallback.filter(p => p.pest_key === 'general')
    }
  }

  return NextResponse.json({
    products,
    district: districtName,
    pest: pestName || null,
    total: products.length,
    source: products && products.length > 0 && 'link' in products[0] && products[0].link ? 'serp' : 'seed',
  })
}
