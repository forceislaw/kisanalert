export interface StoreProductSeed {
  pest_key: string
  product_name: string
  product_type: 'pesticide' | 'fungicide' | 'insecticide' | 'herbicide' | 'bio-control' | 'trap' | 'other'
  brand: string
  price_range: string
  store_type: 'general' | 'agro'
  unit: string
}

export const STORE_PRODUCTS: StoreProductSeed[] = [
  // Wheat Rust / Yellow Rust
  { pest_key: 'wheat_rust', product_name: 'Tebuconazole 25.9% EC', product_type: 'fungicide', brand: 'Bayer', price_range: '₹480–₹620/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'wheat_rust', product_name: 'Propiconazole 25% EC', product_type: 'fungicide', brand: 'Syngenta', price_range: '₹520–₹680/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'wheat_rust', product_name: 'Mancozeb 75% WP', product_type: 'fungicide', brand: 'UPL', price_range: '₹280–₹360/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'wheat_rust', product_name: 'Hexaconazole 5% SC', product_type: 'fungicide', brand: 'Rallis', price_range: '₹320–₹420/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'wheat_rust', product_name: 'Sulphur 80% WDG', product_type: 'fungicide', brand: 'Coromandel', price_range: '₹180–₹250/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'yellow_rust', product_name: 'Tebuconazole 25.9% EC', product_type: 'fungicide', brand: 'Bayer', price_range: '₹480–₹620/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'yellow_rust', product_name: 'Propiconazole 25% EC', product_type: 'fungicide', brand: 'Syngenta', price_range: '₹520–₹680/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'stripe_rust', product_name: 'Propiconazole 25% EC', product_type: 'fungicide', brand: 'Syngenta', price_range: '₹520–₹680/L', store_type: 'agro', unit: '1 L' },

  // Pink Bollworm
  { pest_key: 'pink_bollworm', product_name: 'Emamectin Benzoate 5% SG', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹680–₹850/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'pink_bollworm', product_name: 'Cypermethrin 10% EC', product_type: 'insecticide', brand: 'Bayer', price_range: '₹320–₹420/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'pink_bollworm', product_name: 'Spinosad 45% SC', product_type: 'insecticide', brand: 'Dow', price_range: '₹1,200–₹1,500/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'pink_bollworm', product_name: 'Lambda-cyhalothrin 5% EC', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹380–₹480/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'pink_bollworm', product_name: 'PB Rope Lures (mating disruption)', product_type: 'trap', brand: 'ATGC Biotech', price_range: '₹120–₹180/piece', store_type: 'agro', unit: '1 piece' },

  // Brown Planthopper
  { pest_key: 'brown_plant_hopper', product_name: 'Imidacloprid 17.8% SL', product_type: 'insecticide', brand: 'Bayer', price_range: '₹420–₹560/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'brown_plant_hopper', product_name: 'Pymetrozine 50% WG', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹850–₹1,050/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'brown_plant_hopper', product_name: 'Buprofezin 25% SC', product_type: 'insecticide', brand: 'Rallis', price_range: '₹550–₹700/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'brown_plant_hopper', product_name: 'Thiamethoxam 25% WG', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹620–₹780/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'brown_plant_hopper', product_name: 'Neem Oil 0.15% EC (botanical)', product_type: 'bio-control', brand: 'Godrej', price_range: '₹150–₹220/L', store_type: 'general', unit: '1 L' },

  // Fall Armyworm
  { pest_key: 'fall_armyworm', product_name: 'Spinetoram 12% SC', product_type: 'insecticide', brand: 'Dow', price_range: '₹1,100–₹1,400/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'fall_armyworm', product_name: 'Chlorantraniliprole 18.5% SC', product_type: 'insecticide', brand: 'FMC', price_range: '₹980–₹1,250/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'fall_armyworm', product_name: 'Emamectin Benzoate 5% SG', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹680–₹850/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'fall_armyworm', product_name: 'Thiodicarb 75% WP', product_type: 'insecticide', brand: 'Bayer', price_range: '₹320–₹420/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'fall_armyworm', product_name: 'FAW Pheromone Trap', product_type: 'trap', brand: 'Pheromone Chemicals', price_range: '₹80–₹120/piece', store_type: 'agro', unit: '1 piece' },

  // Aphids
  { pest_key: 'aphids', product_name: 'Imidacloprid 17.8% SL', product_type: 'insecticide', brand: 'Bayer', price_range: '₹420–₹560/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'aphids', product_name: 'Dimethoate 30% EC', product_type: 'insecticide', brand: 'Rallis', price_range: '₹280–₹380/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'aphids', product_name: 'Acetamiprid 20% SP', product_type: 'insecticide', brand: 'UPL', price_range: '₹520–₹680/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'aphids', product_name: 'Neem Oil 0.15% EC (botanical)', product_type: 'bio-control', brand: 'Godrej', price_range: '₹150–₹220/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'aphids', product_name: 'Verticillium lecanii (bio)', product_type: 'bio-control', brand: 'T. Stanes', price_range: '₹320–₹420/kg', store_type: 'agro', unit: '1 kg' },

  // Leaf Blight
  { pest_key: 'leaf_blight', product_name: 'Mancozeb 75% WP', product_type: 'fungicide', brand: 'UPL', price_range: '₹280–₹360/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'leaf_blight', product_name: 'Copper Oxychloride 50% WP', product_type: 'fungicide', brand: 'Bayer', price_range: '₹320–₹420/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'leaf_blight', product_name: 'Carbendazim 50% WP', product_type: 'fungicide', brand: 'BASF', price_range: '₹380–₹480/kg', store_type: 'agro', unit: '1 kg' },

  // Rice Blast
  { pest_key: 'rice_blast', product_name: 'Tricyclazole 75% WP', product_type: 'fungicide', brand: 'Syngenta', price_range: '₹520–₹680/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'rice_blast', product_name: 'Carbendazim 50% WP', product_type: 'fungicide', brand: 'BASF', price_range: '₹380–₹480/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'rice_blast', product_name: 'Isoprothiolane 40% EC', product_type: 'fungicide', brand: 'Rallis', price_range: '₹650–₹820/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'rice_blast', product_name: 'Edifenphos 50% EC', product_type: 'fungicide', brand: 'Bayer', price_range: '₹450–₹580/L', store_type: 'agro', unit: '1 L' },

  // Leaf Folder
  { pest_key: 'leaf_folder', product_name: 'Chlorpyrifos 20% EC', product_type: 'insecticide', brand: 'UPL', price_range: '₹280–₹380/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'leaf_folder', product_name: 'Cartap Hydrochloride 50% SP', product_type: 'insecticide', brand: 'Rallis', price_range: '₹450–₹580/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'leaf_folder', product_name: 'Quinalphos 25% EC', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹350–₹450/L', store_type: 'general', unit: '1 L' },

  // Stem Borer
  { pest_key: 'stem_borer', product_name: 'Carbofuran 3% CG', product_type: 'insecticide', brand: 'Rallis', price_range: '₹220–₹310/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'stem_borer', product_name: 'Cartap Hydrochloride 50% SP', product_type: 'insecticide', brand: 'Rallis', price_range: '₹450–₹580/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'stem_borer', product_name: 'Fipronil 0.3% GR', product_type: 'insecticide', brand: 'BASF', price_range: '₹320–₹420/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'stem_borer', product_name: 'Chlorantraniliprole 0.4% GR', product_type: 'insecticide', brand: 'FMC', price_range: '₹550–₹700/kg', store_type: 'agro', unit: '1 kg' },

  // Pod Borer
  { pest_key: 'pod_borer', product_name: 'Indoxacarb 14.5% SC', product_type: 'insecticide', brand: 'FMC', price_range: '₹820–₹1,050/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'pod_borer', product_name: 'Spinosad 45% SC', product_type: 'insecticide', brand: 'Dow', price_range: '₹1,200–₹1,500/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'pod_borer', product_name: 'Cypermethrin 10% EC', product_type: 'insecticide', brand: 'Bayer', price_range: '₹320–₹420/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'pod_borer', product_name: 'Emamectin Benzoate 5% SG', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹680–₹850/kg', store_type: 'agro', unit: '1 kg' },

  // Late Blight
  { pest_key: 'late_blight', product_name: 'Chlorothalonil 75% WP', product_type: 'fungicide', brand: 'Syngenta', price_range: '₹520–₹650/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'late_blight', product_name: 'Metalaxyl + Mancozeb 72% WP', product_type: 'fungicide', brand: 'Bayer', price_range: '₹480–₹620/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'late_blight', product_name: 'Cymoxanil 8% + Mancozeb 64% WP', product_type: 'fungicide', brand: 'UPL', price_range: '₹560–₹720/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'late_blight', product_name: 'Copper Hydroxide 53.8% WG', product_type: 'fungicide', brand: 'Coromandel', price_range: '₹380–₹480/kg', store_type: 'general', unit: '1 kg' },

  // Cotton Leaf Curl Virus (vector management)
  { pest_key: 'clcv', product_name: 'Imidacloprid 17.8% SL', product_type: 'insecticide', brand: 'Bayer', price_range: '₹420–₹560/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'clcv', product_name: 'Diafenthiuron 50% SC', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹780–₹950/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'clcv', product_name: 'Yellow Sticky Trap', product_type: 'trap', brand: 'Koppert', price_range: '₹35–₹55/piece', store_type: 'agro', unit: '1 piece' },

  // Fruit Spot / Fungal Fruit Spot
  { pest_key: 'fungal_fruit_spot', product_name: 'Carbendazim 50% WP', product_type: 'fungicide', brand: 'BASF', price_range: '₹380–₹480/kg', store_type: 'agro', unit: '1 kg' },
  { pest_key: 'fungal_fruit_spot', product_name: 'Copper Oxychloride 50% WP', product_type: 'fungicide', brand: 'Bayer', price_range: '₹320–₹420/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'fungal_fruit_spot', product_name: 'Difenoconazole 25% EC', product_type: 'fungicide', brand: 'Syngenta', price_range: '₹680–₹850/L', store_type: 'agro', unit: '1 L' },

  // Whitefly
  { pest_key: 'whitefly', product_name: 'Imidacloprid 17.8% SL', product_type: 'insecticide', brand: 'Bayer', price_range: '₹420–₹560/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'whitefly', product_name: 'Buprofezin 25% SC', product_type: 'insecticide', brand: 'Rallis', price_range: '₹550–₹700/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'whitefly', product_name: 'Spiromesifen 22.9% SC', product_type: 'insecticide', brand: 'Bayer', price_range: '₹920–₹1,150/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'whitefly', product_name: 'Yellow Sticky Trap', product_type: 'trap', brand: 'Koppert', price_range: '₹35–₹55/piece', store_type: 'agro', unit: '1 piece' },

  // Thrips
  { pest_key: 'thrips', product_name: 'Spinosad 45% SC', product_type: 'insecticide', brand: 'Dow', price_range: '₹1,200–₹1,500/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'thrips', product_name: 'Fipronil 5% SC', product_type: 'insecticide', brand: 'BASF', price_range: '₹480–₹620/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'thrips', product_name: 'Acephate 75% SP', product_type: 'insecticide', brand: 'UPL', price_range: '₹250–₹350/kg', store_type: 'general', unit: '1 kg' },

  // Mites
  { pest_key: 'mites', product_name: 'Fenazaquin 10% EC', product_type: 'pesticide', brand: 'Rallis', price_range: '₹720–₹880/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'mites', product_name: 'Sulphur 80% WDG', product_type: 'pesticide', brand: 'Coromandel', price_range: '₹180–₹250/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'mites', product_name: 'Abamectin 1.9% EC', product_type: 'pesticide', brand: 'Syngenta', price_range: '₹620–₹780/L', store_type: 'agro', unit: '1 L' },

  // General / broad spectrum
  { pest_key: 'general', product_name: 'Neem Oil 0.15% EC (botanical)', product_type: 'bio-control', brand: 'Godrej', price_range: '₹150–₹220/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'general', product_name: 'Garlic + Chilli Extract (bio)', product_type: 'bio-control', brand: 'T. Stanes', price_range: '₹200–₹300/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'general', product_name: 'Tricontanol 0.05% EC (growth)', product_type: 'other', brand: 'Rallis', price_range: '₹250–₹350/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'general', product_name: 'Pheromone Multi-trap', product_type: 'trap', brand: 'Pheromone Chemicals', price_range: '₹120–₹180/piece', store_type: 'agro', unit: '1 piece' },
  { pest_key: 'general', product_name: 'Yellow Sticky Trap', product_type: 'trap', brand: 'Koppert', price_range: '₹35–₹55/piece', store_type: 'agro', unit: '1 piece' },
  { pest_key: 'general', product_name: 'pH Meter (digital)', product_type: 'other', brand: 'Hanna', price_range: '₹1,200–₹1,800/piece', store_type: 'agro', unit: '1 piece' },
  { pest_key: 'general', product_name: 'Hydroponic nutrient A+B (1L)', product_type: 'other', brand: 'General Hydroponics', price_range: '₹350–₹500/set', store_type: 'agro', unit: '1 set' },
  { pest_key: 'general', product_name: 'Soil Moisture Meter', product_type: 'other', brand: 'BioControl', price_range: '₹450–₹600/piece', store_type: 'general', unit: '1 piece' },
  { pest_key: 'general', product_name: 'NPK 19:19:19 (1 kg)', product_type: 'other', brand: 'IFFCO', price_range: '₹120–₹180/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'general', product_name: 'Seaweed Extract Liquid (500 ml)', product_type: 'other', brand: 'KelpMax', price_range: '₹280–₹380/bottle', store_type: 'agro', unit: '1 bottle' },

  // No pest (healthy)
  { pest_key: 'none', product_name: 'NPK 19:19:19 (1 kg)', product_type: 'other', brand: 'IFFCO', price_range: '₹120–₹180/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'none', product_name: 'Compost Accelerator', product_type: 'other', brand: 'T. Stanes', price_range: '₹220–₹320/kg', store_type: 'general', unit: '1 kg' },
  { pest_key: 'none', product_name: 'Seaweed Extract Liquid (500 ml)', product_type: 'other', brand: 'KelpMax', price_range: '₹280–₹380/bottle', store_type: 'agro', unit: '1 bottle' },
  { pest_key: 'none', product_name: 'pH Meter (digital)', product_type: 'other', brand: 'Hanna', price_range: '₹1,200–₹1,800/piece', store_type: 'agro', unit: '1 piece' },

  // Cotton specific
  { pest_key: 'cotton_leaf_curl_virus', product_name: 'Imidacloprid 17.8% SL', product_type: 'insecticide', brand: 'Bayer', price_range: '₹420–₹560/L', store_type: 'general', unit: '1 L' },
  { pest_key: 'cotton_leaf_curl_virus', product_name: 'Diafenthiuron 50% SC', product_type: 'insecticide', brand: 'Syngenta', price_range: '₹780–₹950/L', store_type: 'agro', unit: '1 L' },
  { pest_key: 'cotton_leaf_curl_virus', product_name: 'Yellow Sticky Trap', product_type: 'trap', brand: 'Koppert', price_range: '₹35–₹55/piece', store_type: 'agro', unit: '1 piece' },
]
