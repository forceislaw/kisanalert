'use client'

import React, { useState, useEffect } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'
import { useRouter } from 'next/navigation'
import UploadDropzone from '@/components/upload/UploadDropzone'
import VisionResultCard from '@/components/upload/VisionResultCard'
import { DistrictSearch } from '@/components/ui/DistrictSearch'
import { VisionAnalysisResult } from '@/app/api/vision-analyze/route'
import { RAIN_SHADOW_DISTRICTS } from '@/lib/seed/districts'
export default function UploadPage() {
  const { dict } = useLocale()
  const router = useRouter()

  const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResult | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null)
  const [observationDate, setObservationDate] = useState(new Date().toISOString().split('T')[0])
  const [userLat, setUserLat] = useState<number | null>(null)
  const [userLng, setUserLng] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [cropMap, setCropMap] = useState<Record<string, number>>({})
  const [pestMap, setPestMap] = useState<Record<string, number>>({})
  const [districtMap, setDistrictMap] = useState<Record<string, number>>({})
  const [lookupsReady, setLookupsReady] = useState(false)

  useEffect(() => {
    fetch('/api/lookups').then((r) => r.json()).then((data) => {
      setCropMap(data.cropMap)
      setPestMap(data.pestMap)
      setDistrictMap(data.districtMap)
      setLookupsReady(true)
    })
  }, [])

  const resetForm = () => {
    setAnalysisResult(null)
    setImageUrl(null)
    setSubmitted(false)
    setSubmitError(null)
  }

  useEffect(() => {
    if (!lookupsReady) return
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          let { latitude, longitude } = pos.coords
          if (latitude < 6 || latitude > 37 || longitude < 68 || longitude > 98) { latitude = 0; longitude = 0 }
          setUserLat(latitude)
          setUserLng(longitude)
          let closestName = ''
          let minDist = Infinity
          RAIN_SHADOW_DISTRICTS.forEach((d) => {
            const dist = Math.hypot(d.latitude - latitude, d.longitude - longitude)
            if (dist < minDist) { minDist = dist; closestName = d.name_en }
          })
          if (minDist < 2 && closestName) {
            const id = districtMap[closestName]
            if (id) setSelectedDistrict(id)
          }
        },
        () => {},
        { enableHighAccuracy: false, timeout: 5000 }
      )
    }
  }, [lookupsReady, districtMap])

  const handleAnalysisComplete = (result: VisionAnalysisResult, url: string) => {
    if (result.crop_guess === 'unknown') {
      setSubmitError('No crop detected in this image. Please upload a clear photo of a crop or plant showing leaves, fruit, or stems.')
      setAnalysisResult(null)
      setImageUrl(null)
      return
    }
    setAnalysisResult(result)
    setImageUrl(url)
    setSubmitError(null)
  }

  const findCropId = (guess: string): number | null => {
    const lower = guess.toLowerCase()
    for (const [name, id] of Object.entries(cropMap)) {
      if (name.includes(lower) || lower.includes(name)) return id
    }
    return null
  }

  const findPestId = (name: string): number | null => {
    const lower = name.toLowerCase()
    for (const [pestName, id] of Object.entries(pestMap)) {
      if (pestName.includes(lower) || lower.includes(pestName)) return id
    }
    return null
  }

  const handleConfirm = async () => {
    if (!analysisResult || !imageUrl) return

    const cropId = findCropId(analysisResult.crop_guess)
    const pestId = analysisResult.pest_name ? findPestId(analysisResult.pest_name) : null

    if (!cropId) {
      setSubmitError(`Unknown crop: "${analysisResult.crop_guess}"`)
      setIsSubmitting(false)
      return
    }
    if (!selectedDistrict) {
      setSubmitError('Please select a district')
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const blobRes = await fetch(imageUrl)
      const imageBlob = await blobRes.blob()

      const formData = new FormData()
      formData.append('image', imageBlob, 'crop.jpg')
      formData.append('district_id', String(selectedDistrict))
      formData.append('crop_id', String(cropId))
      formData.append('detected_pest_id', pestId ? String(pestId) : '')
      formData.append('ai_pest_name', analysisResult.pest_name && !pestId ? analysisResult.pest_name : '')
      formData.append('severity_level', analysisResult.severity_estimate === 'medium' ? 'moderate' : analysisResult.severity_estimate)
      formData.append('confidence_score', String(analysisResult.confidence))
      if (userLat !== null) formData.append('latitude', String(userLat))
      if (userLng !== null) formData.append('longitude', String(userLng))

      const res = await fetch('/api/reports', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to submit report')
      }

      setSubmitted(true)
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : dict.common.error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const showAnalysis = analysisResult && imageUrl

  const handleDiscard = () => {
    setAnalysisResult(null)
    setImageUrl(null)
    if (imageUrl) URL.revokeObjectURL(imageUrl)
  }

  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      <div className="border-b border-stone pb-5">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          {dict.upload.title}
        </h1>
        <p className="eyebrow mt-1">{dict.upload.subtitle}</p>
      </div>

      {submitError && (
        <div className="p-4 border border-terra bg-terra/10 text-terra-dark text-sm flex items-center gap-3">
          <span>{submitError}</span>
        </div>
      )}

      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="text-4xl text-forest mb-2">&#10003;</div>
          <h2 className="text-2xl font-bold text-charcoal">Report Submitted</h2>
          <p className="text-charcoal-muted text-sm">Your pest report has been recorded successfully.</p>
          <div className="flex justify-center gap-4 pt-4">
            <button onClick={() => router.push('/reports')} className="btn-editorial">
              View Reports
            </button>
            <button onClick={resetForm} className="btn-editorial-outline">
              Upload Another
            </button>
          </div>
        </div>
      ) : !analysisResult ? (
        <>
          <UploadDropzone onAnalysisComplete={handleAnalysisComplete} />
          <div className="border-t border-stone pt-6 mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-muted mb-2">Detectable Crops</p>
            <div className="flex flex-wrap gap-1.5">
              {['Cotton','Soybean','Groundnut','Jowar','Bajra','Tur','Chili','Sugarcane','Grapes','Pomegranate','Maize','Sunflower','Wheat','Rice','Banana','Mango','Coconut','Onion','Potato','Tomato','Tea','Coffee','Mustard','Sesame','Gram','Barley','Moong','Urad','Masoor','Tapioca'].map(c => (
                <span key={c} className="text-[11px] px-2 py-0.5 bg-parchment-dark text-charcoal-muted rounded-sm">{c}</span>
              ))}
            </div>
          </div>
        </>
      ) : showAnalysis ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="eyebrow block mb-1.5">Location (District)</label>
              <DistrictSearch value={selectedDistrict} onChange={(id) => setSelectedDistrict(id)} nameToIdMap={districtMap} />
            </div>
            <div>
              <label className="eyebrow block mb-1.5">Date of Observation</label>
              <input
                type="date"
                value={observationDate}
                onChange={(e) => setObservationDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="select-editorial w-full"
              />
            </div>
          </div>

          <VisionResultCard
            result={analysisResult}
            imageUrl={imageUrl!}
            onConfirm={handleConfirm}
            onDiscard={handleDiscard}
            isSubmitting={isSubmitting}
          />
        </div>
      ) : null}
    </div>
  )
}
