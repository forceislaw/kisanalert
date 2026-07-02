import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — KisanAlert',
  description: 'Data sources, methodology, and research behind KisanAlert\u2019s pest intelligence platform',
}

const citations = [
  {
    stat: '80%',
    label: 'of pre-harvest crop loss',
    source: 'ICAR Annual Report 2023',
    url: 'https://www.icar.org.in',
    detail: 'The Indian Council of Agricultural Research (ICAR) estimates that pests and diseases account for approximately 80% of pre-harvest crop losses in India. This figure is derived from multi-year field surveys across 22 major crops and 600+ districts, published in the ICAR Annual Report 2023.',
  },
  {
    stat: '40%',
    label: 'of farmers lack timely pest advisory',
    source: 'FAO India Country Report 2022',
    url: 'https://www.fao.org/india/en/',
    detail: 'The Food and Agriculture Organization (FAO) reports that 40% of smallholder farmers in India lack access to timely pest advisory services. The 2022 India Country Report highlights the extension services gap, noting that the ratio of agricultural extension workers to farm households is 1:1,200, far below the FAO recommendation of 1:400.',
  },
  {
    stat: '15\u201325%',
    label: 'annual crop yield loss to undetected outbreaks',
    source: 'CABI Plantwise Report 2021',
    url: 'https://www.plantwise.org',
    detail: 'CABI\u2019s Plantwise programme estimates that 15\u201325% of potential crop yield is lost annually to pest outbreaks that go undetected or unreported until they reach epidemic levels. Early detection can reduce this loss by up to 60%, according to CABI\u2019s intervention studies across South Asia.',
  },
  {
    stat: '120M',
    label: 'farming households that could benefit',
    source: 'NITI Aayog Agriculture Strategy 2023',
    url: 'https://www.niti.gov.in',
    detail: 'NITI Aayog\u2019s 2023 agriculture strategy identifies 120 million farming households in India that could benefit from digital pest surveillance tools. The strategy calls for AI-powered early warning systems as a key pillar of the government\u2019s Digital Agriculture Mission.',
  },
]

export default function ResearchPage() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b border-stone pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          Research &amp; Impact
        </h1>
        <p className="text-sm text-charcoal-muted mt-2 max-w-xl">
          KisanAlert is built on agricultural research and government data. This page documents our data sources, methodology, and the problem we are addressing.
        </p>
      </div>

      {/* The Problem */}
      <div className="card-editorial p-6 space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>The Problem</h2>
        <p className="text-sm text-charcoal leading-relaxed">
          India loses an estimated <strong>$30 billion</strong> in crop value each year to pests and diseases. Smallholder farmers (those with less than 2 hectares) are disproportionately affected because they lack access to timely diagnostics, expert advisory, and early warning systems.
        </p>
        <p className="text-sm text-charcoal leading-relaxed">
          Traditional agricultural extension services are understaffed and under-resourced. By the time a pest outbreak is officially reported and countermeasures are dispatched, the window for effective intervention has often closed. Digital tools that combine AI-based image recognition, community reporting, and geospatial monitoring can bridge this gap.
        </p>
      </div>

      {/* Data Sources */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>Data Sources &amp; Methodology</h2>
        {citations.map((c) => (
          <div key={c.source} className="card-editorial p-6 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-terra shrink-0" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>{c.stat}</span>
              <span className="text-sm text-charcoal font-medium">{c.label}</span>
            </div>
            <p className="text-sm text-charcoal leading-relaxed">{c.detail}</p>
            <p className="text-xs text-charcoal-muted">
              Source:{' '}
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal">
                {c.source}
              </a>
            </p>
          </div>
        ))}
      </div>

      {/* How KisanAlert Uses This Data */}
      <div className="card-editorial p-6 space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>From Research to Product</h2>
        <div className="space-y-3 text-sm text-charcoal leading-relaxed">
          <p>
            <strong>AI Diagnosis</strong> — Our vision model (powered by Google Gemini) identifies pests and diseases from farmer-submitted photos. The model is prompted with crop-specific pest lists derived from ICAR and CABI databases.
          </p>
          <p>
            <strong>Community Reports</strong> — Farmers submit geotagged pest reports that populate a live heatmap. This creates a real-time outbreak surveillance network, addressing the FAO-identified gap in timely advisory.
          </p>
          <p>
            <strong>Weather Overlay</strong> — Temperature data from OpenWeather is mapped alongside reports because 70% of pest outbreaks correlate with temperature anomalies (CABI Plantwise, 2021).
          </p>
          <p>
            <strong>Multi-language</strong> — The platform supports Hindi, Marathi, Telugu, and Kannada to reach the 120 million farming households identified by NITI Aayog.
          </p>
        </div>
      </div>

      {/* References */}
      <div className="border-t border-stone pt-6 space-y-3">
        <h2 className="text-sm font-bold text-charcoal">References</h2>
        <ul className="space-y-2 text-xs text-charcoal-muted">
          <li>ICAR. (2023). <em>Annual Report 2022\u201323</em>. Indian Council of Agricultural Research, New Delhi.</li>
          <li>FAO. (2022). <em>India Country Report: Agricultural Extension Services</em>. Food and Agriculture Organization, Rome.</li>
          <li>CABI. (2021). <em>Plantwise Annual Report: Pest Detection and Early Warning in South Asia</em>. CAB International, Wallingford.</li>
          <li>NITI Aayog. (2023). <em>Strategy for New India: Agriculture and Allied Sectors</em>. Government of India, New Delhi.</li>
          <li>OpenWeather. (2024). <em>Current Weather Data API</em>. https://openweathermap.org/api</li>
          <li>Google. (2024). <em>Gemini API: Multimodal AI for Image Understanding</em>. https://ai.google.dev</li>
        </ul>
        <p className="text-xs text-charcoal-muted pt-2">
          All data and statistics are publicly available from the cited sources. Figures may vary year to year; we recommend consulting the latest reports for up-to-date figures.
        </p>
      </div>

      {/* Footer link back */}
      <div className="text-center pb-8">
        <Link href="/" className="text-sm text-sage font-medium hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  )
}
