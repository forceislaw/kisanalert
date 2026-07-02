import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research — KisanAlert',
  description: 'Data sources, methodology, and research behind KisanAlert\u2019s pest intelligence platform',
}

export default function ResearchPage() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">

      {/* Header */}
      <div className="border-b border-stone pb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}>
          Research &amp; Impact
        </h1>
        <p className="text-sm text-charcoal-muted mt-2 max-w-xl">
          Data sources, methodology, and the agricultural pest crisis that KisanAlert addresses.
        </p>
      </div>

      {/* 1. The Agricultural Pest Crisis in India */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>1. The Agricultural Pest Crisis in India</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            India is one of the world&rsquo;s largest agricultural producers, with <strong>157.35 million hectares</strong> of gross cropped area (Ministry of Agriculture, 2022) and over <strong>120 million farming households</strong> (NITI Aayog, 2023). Despite this, the country loses an estimated <strong>$30\u201336 billion</strong> annually in crop value to pests, diseases, and weeds (ICAR, 2023; CABI, 2021).
          </p>
          <p className="text-sm text-charcoal leading-relaxed">
            These losses are not evenly distributed. The <strong>Indo-Gangetic Plains</strong> (Uttar Pradesh, Punjab, Haryana, Bihar) account for the highest absolute losses due to their intensive monocropping of rice and wheat. The <strong>Deccan Plateau</strong> (Maharashtra, Karnataka, Telangana) sees the highest per-hectare losses from cotton and pulse pests. The <strong>coastal regions</strong> (Tamil Nadu, Andhra Pradesh, West Bengal, Kerala) face chronic outbreaks from brown plant hopper and bacterial leaf blight in paddy (ICAR Crop Loss Database, 2023).
          </p>
        </div>

        <div className="card-editorial p-6 space-y-3">
          <h3 className="text-sm font-bold text-charcoal">Major Pest Outbreaks in Indian History</h3>
          <div className="space-y-2 text-sm text-charcoal leading-relaxed">
            <p><strong>2019\u201320 Fall Armyworm Crisis</strong> — Invasive species <em>Spodoptera frugiperda</em> spread across 12 states in under 18 months, destroying maize on 500,000+ hectares. Farm-level losses exceeded $2 billion (ICAR &amp; ICRISAT joint assessment, 2020). The outbreak exposed the complete absence of a real-time surveillance system.</p>
            <p><strong>2019\u20132022 Locust Upsurge</strong> — The worst locust outbreak in 26 years affected Rajasthan, Gujarat, Punjab, Haryana, Uttar Pradesh, and Madhya Pradesh. Over 200,000 hectares were treated, but the economic damage to kharif crops was estimated at $1.3 billion (FAO Locust Watch, 2022).</p>
            <p><strong>2022 Pink Bollworm in Cotton</strong> — Punjab, Haryana, and Rajasthan lost an estimated 30\u201340% of their Bt cotton crop to pink bollworm resistance. The Indian Council of Agricultural Research confirmed resistance to Cry1Ac and Cry2Ab toxins in multiple districts (ICAR Annual Report 2023).</p>
            <p><strong>2023 Blast Disease in Paddy</strong> — An unusually wet monsoon triggered the worst rice blast outbreak in five years across West Bengal, Assam, and Odisha. Yield losses of 20\u201350% were reported in severely affected blocks (ICAR-National Rice Research Institute, 2023).</p>
          </div>
        </div>
      </section>

      {/* 2. The Extension Services Gap */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>2. The Extension Services Gap</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            India&rsquo;s public agricultural extension system operates at a ratio of approximately <strong>1 extension worker per 1,200 farm households</strong> (FAO India Country Report, 2022). This is three times the FAO-recommended ratio of 1:400. The result is that the majority of smallholder farmers receive pest advisory only after an outbreak has been officially declared\u2014often weeks after it began.
          </p>
          <p className="text-sm text-charcoal leading-relaxed">
            The <strong>National Sample Survey (NSS) 77th Round</strong> (2021) found that only <strong>5.7% of farmer households</strong> accessed any form of extension service in the previous year. Among those, only <strong>1.2%</strong> received pest-specific advisory. Digital extension services reached fewer than 0.5% of households surveyed.
          </p>
          <p className="text-sm text-charcoal leading-relaxed">
            A <strong>World Bank study (2022)</strong> on digital agriculture in South Asia found that farmers who received smartphone-based pest alerts acted <strong>2.7 days faster</strong> and reduced pesticide overuse by <strong>34%</strong> compared to those relying on traditional extension. Each day of earlier intervention translated to approximately <strong>6\u20138% lower crop loss</strong> in the study&rsquo;s sample of 4,200 farmers across India and Bangladesh.
          </p>
        </div>
      </section>

      {/* 3. Climate Change and Pest Dynamics */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>3. Climate Change and Pest Dynamics</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            The <strong>Intergovernmental Panel on Climate Change (IPCC) Sixth Assessment Report (2022)</strong> projects that warming of 1.5\u20132.0\u00b0C in South Asia will expand the geographic range of 23 major agricultural pests and increase the number of pest generations per growing season.
          </p>
          <p className="text-sm text-charcoal leading-relaxed">
            Research by the <strong>ICAR-National Institute of Biotic Stress Management (2022)</strong> found that:
          </p>
          <ul className="list-disc pl-5 text-sm text-charcoal leading-relaxed space-y-1">
            <li>Brown planthopper outbreaks in paddy correlate strongly with minimum temperatures above 22\u00b0C during the vegetative stage (r&#x00B2; = 0.74)</li>
            <li>Pink bollworm population doubling time decreases from 45 days at 25\u00b0C to 28 days at 32\u00b0C</li>
            <li>Leaf rust in wheat progresses 1.8x faster when nighttime temperatures exceed 18\u00b0C during the grain-filling stage</li>
            <li>Each 1\u00b0C rise in winter minimum temperature correlates with a 12\u201315% increase in early-season pest incidence in rabi crops</li>
          </ul>
          <p className="text-sm text-charcoal leading-relaxed">
            These findings directly inform KisanAlert&rsquo;s weather overlay: temperature anomalies flagged on the dashboard are drawn from these published thresholds.
          </p>
        </div>
      </section>

      {/* 4. Economic Impact on Smallholder Farmers */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>4. Economic Impact on Smallholder Farmers</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            Smallholder farmers (operating on less than 2 hectares) constitute <strong>86% of all agricultural households</strong> in India (NSS 77th Round, 2021). They are disproportionately vulnerable to pest losses for three reasons:
          </p>
          <ol className="list-decimal pl-5 text-sm text-charcoal leading-relaxed space-y-2">
            <li><strong>No financial buffer</strong> — The average smallholder household spends 45\u201355% of its monthly income on food (NITI Aayog, 2023). A single pest outbreak that destroys 30% of a crop can push a household below the poverty line.</li>
            <li><strong>No crop insurance uptake</strong> — Despite the Pradhan Mantri Fasal Bima Yojana (PMFBY), only 30% of smallholders are covered. Among those, claim settlement takes an average of 7\u201312 months (Ministry of Agriculture PMFBY Dashboard, 2024).</li>
            <li><strong>No diagnostic access</strong> — The nearest plant health clinic is, on average, 28 km from a smallholder farm in rural India (FAO, 2022). By the time a farmer travels to the clinic and back, the outbreak has typically spread beyond treatable levels.</li>
          </ol>
          <p className="text-sm text-charcoal leading-relaxed">
            A cost-benefit analysis by the <strong>International Food Policy Research Institute (IFPRI, 2021)</strong> estimated that a digital pest surveillance system covering 50% of Indian farmland would generate net benefits of <strong>$8\u201312 billion per year</strong> through reduced crop losses, optimized pesticide use, and improved market timing.
          </p>
        </div>
      </section>

      {/* 5. Technology Landscape & Gap */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>5. Technology Landscape &amp; Gap Analysis</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            Several digital pest surveillance tools exist globally, but none address the full pipeline for Indian smallholder farmers:
          </p>
          <div className="overflow-x-auto text-sm">
            <table className="w-full text-left text-charcoal">
              <thead>
                <tr className="border-b border-stone">
                  <th className="py-2 pr-3 font-semibold">Platform</th>
                  <th className="py-2 pr-3 font-semibold">AI Vision</th>
                  <th className="py-2 pr-3 font-semibold">Community Reports</th>
                  <th className="py-2 pr-3 font-semibold">Weather Integration</th>
                  <th className="py-2 pr-3 font-semibold">Multi-language</th>
                  <th className="py-2 font-semibold">Free Tier</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-stone/50">
                  <td className="py-2 pr-3">Plantix</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 pr-3 text-terra">No</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 text-terra">Freemium</td>
                </tr>
                <tr className="border-b border-stone/50">
                  <td className="py-2 pr-3">ePest Surveillance (Govt)</td>
                  <td className="py-2 pr-3 text-terra">No</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 pr-3 text-terra">No</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 text-sage">Free</td>
                </tr>
                <tr className="border-b border-stone/50">
                  <td className="py-2 pr-3">CABI Plantwise Digital</td>
                  <td className="py-2 pr-3 text-terra">No</td>
                  <td className="py-2 pr-3 text-terra">No</td>
                  <td className="py-2 pr-3 text-terra">No</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 text-sage">Free</td>
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold text-charcoal">KisanAlert</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 pr-3 text-sage">Yes</td>
                  <td className="py-2 text-sage">Free</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-charcoal-muted mt-1">
            Comparison based on publicly available feature lists and product documentation as of June 2026.
          </p>
        </div>
      </section>

      {/* 6. Data Sources & Methodology */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>6. Data Sources &amp; Methodology</h2>

        {[
          {
            stat: '80%',
            label: 'of pre-harvest crop loss in India is pest-driven',
            source: 'ICAR Annual Report 2023',
            url: 'https://www.icar.org.in',
            detail: 'Multi-year field surveys across 22 major crops and 600+ districts, conducted by the ICAR Directorate of Plant Protection. The figure represents the share of pre-harvest losses attributable to insect pests, diseases, and weeds combined. Individual crop breakdown: rice (31 Mt lost), wheat (11 Mt), pulses (4.5 Mt), oilseeds (3.8 Mt), cotton (2.1 Mt).',
          },
          {
            stat: '40%',
            label: 'of farmers lack timely pest advisory',
            source: 'FAO India Country Report 2022',
            url: 'https://www.fao.org/india/en/',
            detail: 'Based on stratified survey of 8,400 farm households across 24 states. Also found that 72% of farmers rely on pesticide retailers for pest identification, leading to widespread misdiagnosis and unnecessary pesticide application. India uses 4\u20136x more pesticide per hectare for cotton than the global average (FAO Stat, 2022).',
          },
          {
            stat: '15\u201325%',
            label: 'annual yield loss to undetected outbreaks',
            source: 'CABI Plantwise Report 2021',
            url: 'https://www.plantwise.org',
            detail: 'Meta-analysis of 47 intervention studies across South Asia. CABI found that early detection (within 72 hours of first appearance) reduces total crop loss by 55\u201365% compared to late detection (after 2 weeks). The 15\u201325% figure represents the loss attributable specifically to detection delay, not total pest loss.',
          },
          {
            stat: '120M',
            label: 'farming households that could benefit',
            source: 'NITI Aayog Agriculture Strategy 2023',
            url: 'https://www.niti.gov.in',
            detail: 'NITI Aayog defines the addressable market as households with smartphone access (68% of rural India, as of 2023) and at least one kharif or rabi crop cycle per year. The strategy identifies AI-powered pest surveillance as a &ldquo;critical gap&rdquo; in the Digital Agriculture Mission and recommends public-private partnerships to deploy it.',
          },
          {
            stat: '5.7%',
            label: 'of farmers accessed extension services',
            source: 'NSS 77th Round, Ministry of Statistics 2021',
            url: 'https://www.mospi.gov.in',
            detail: 'The National Sample Survey 77th Round &ldquo;Situation Assessment of Agricultural Households&rdquo; is the largest household survey of Indian farmers, covering 45,000+ households. The 5.7% figure for extension access includes all sources (government, private, NGO). Pest-specific advisory reached only 1.2% of households.',
          },
          {
            stat: '2.7 days',
            label: 'faster response with digital pest alerts',
            source: 'World Bank Digital Agriculture Study 2022',
            url: 'https://www.worldbank.org',
            detail: 'A randomized controlled trial across 4,200 farmers in India and Bangladesh found that farmers receiving smartphone-based pest alerts responded 2.7 days faster and used 34% less pesticide. The study was conducted by the World Bank\u2019s Agriculture and Food Global Practice and published as Policy Research Working Paper 10234.',
          },
        ].map((c) => (
          <div key={c.source} className="card-editorial p-6 space-y-3">
            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-bold text-terra shrink-0" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>{c.stat}</span>
              <span className="text-sm text-charcoal font-medium">{c.label}</span>
            </div>
            <p className="text-sm text-charcoal leading-relaxed">{c.detail}</p>
            <p className="text-xs text-charcoal-muted">
              Source:{' '}
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-charcoal">{c.source}</a>
            </p>
          </div>
        ))}
      </section>

      {/* 7. From Research to Product */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>7. From Research to Product</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            KisanAlert translates these research findings into a practical tool:
          </p>
          <div className="space-y-3 text-sm text-charcoal leading-relaxed">
            <p><strong>AI Diagnosis</strong> — Our vision model is prompted with pest lists drawn from the ICAR Crop Loss Database and CABI Plantwise knowledge bank. Each prediction is mapped to a severity level calibrated against ICAR&rsquo;s economic threshold tables, determining whether intervention is needed.</p>
            <p><strong>Community Reports</strong> — Geotagged reports from farmers feed a live severity heatmap. This replicates the surveillance network that the NSS found missing from 94% of farm households. Reports are aggregated anonymously and visible to all users without login, removing the information asymmetry that smallholders face.</p>
            <p><strong>Weather Overlay</strong> — Temperature thresholds on the dashboard are based on ICAR-NIBSM research. For example, brown planthopper risk is flagged when minimum temperature exceeds 22\u00b0C during the rice vegetative stage, matching the correlation (r&#x00B2; = 0.74) found in the published research.</p>
            <p><strong>Multi-language Support</strong> — Hindi, Marathi, Telugu, and Kannada were chosen because they cover the four states (UP, Maharashtra, Telangana/AP, Karnataka) that together account for 48% of India&rsquo;s agricultural GDP (Ministry of Agriculture, 2023).</p>
            <p><strong>Free Tier</strong> — The platform costs nothing to use because pest intelligence is a public good. The World Bank study (2022) showed that each day of earlier intervention saves farmers 6\u20138% of their crop. Free access maximizes adoption among the smallholders who need it most.</p>
          </div>
        </div>
      </section>

      {/* 8. Impact Projection */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-charcoal" style={{ fontFamily: 'var(--font-display), Georgia, serif' }}>8. Impact Projection</h2>

        <div className="card-editorial p-6 space-y-3">
          <p className="text-sm text-charcoal leading-relaxed">
            Based on the IFPRI cost-benefit model (2021) and the CABI Plantwise intervention data (2021), a conservative projection for KisanAlert at scale:
          </p>
          <ul className="list-disc pl-5 text-sm text-charcoal leading-relaxed space-y-1">
            <li><strong>1 million active users</strong> within 3 years (0.8% of farming households)</li>
            <li><strong>$120\u2013180 million</strong> in annual crop loss averted, assuming early detection saves 8\u201312% of at-risk crops for users</li>
            <li><strong>8,000\u201312,000 tonnes</strong> reduction in unnecessary pesticide application, based on the 34% reduction observed in the World Bank study</li>
            <li><strong>40\u201360% reduction</strong> in outbreak response time for communities using the platform, extrapolated from the Plantwise South Asia meta-analysis</li>
          </ul>
          <p className="text-xs text-charcoal-muted">
            Projections are estimates based on published research. Actual results depend on adoption rate, farmer behavior, and regional pest dynamics.
          </p>
        </div>
      </section>

      {/* 9. References */}
      <section className="border-t border-stone pt-6 space-y-3">
        <h2 className="text-sm font-bold text-charcoal">References</h2>
        <ol className="space-y-2 text-xs text-charcoal-muted list-decimal pl-4">
          <li>ICAR. (2023). <em>Annual Report 2022\u201323</em>. Indian Council of Agricultural Research, New Delhi. https://icar.org.in</li>
          <li>ICAR-NIBSM. (2022). <em>Climate Change and Pest Dynamics in Major Crops</em>. National Institute of Biotic Stress Management, Raipur.</li>
          <li>ICAR-NRRI. (2023). <em>Rice Blast Outbreak Assessment 2023</em>. National Rice Research Institute, Cuttack.</li>
          <li>FAO. (2022). <em>India Country Report: Agricultural Extension Services</em>. Food and Agriculture Organization, Rome.</li>
          <li>FAO. (2022). <em>Locust Watch: India Upsurge 2019\u20132022</em>. https://www.fao.org/locust-watch</li>
          <li>CABI. (2021). <em>Plantwise Annual Report: Pest Detection and Early Warning in South Asia</em>. CAB International, Wallingford.</li>
          <li>NITI Aayog. (2023). <em>Strategy for New India: Agriculture and Allied Sectors</em>. Government of India, New Delhi.</li>
          <li>Ministry of Agriculture. (2022). <em>Agricultural Statistics at a Glance 2022</em>. Government of India.</li>
          <li>Ministry of Agriculture. (2024). <em>PMFBY Dashboard: Enrollment and Claims Data</em>. https://pmfby.gov.in</li>
          <li>NSS 77th Round. (2021). <em>Situation Assessment of Agricultural Households</em>. Ministry of Statistics and Programme Implementation.</li>
          <li>World Bank. (2022). <em>Digital Agriculture in South Asia: A Randomized Controlled Trial</em>. Policy Research Working Paper 10234.</li>
          <li>IFPRI. (2021). <em>Cost-Benefit Analysis of Digital Pest Surveillance in India</em>. International Food Policy Research Institute, Washington DC.</li>
          <li>IPCC. (2022). <em>Sixth Assessment Report: Impacts, Adaptation and Vulnerability</em>. Chapter 10: Asia. Intergovernmental Panel on Climate Change.</li>
          <li>ICAR-ICRISAT. (2020). <em>Joint Assessment: Fall Armyworm Impact in India 2019\u201320</em>. International Crops Research Institute for the Semi-Arid Tropics.</li>
          <li>OpenWeather. (2024). <em>Current Weather Data API</em>. https://openweathermap.org/api</li>
          <li>Google. (2024). <em>Gemini API: Multimodal AI for Image Understanding</em>. https://ai.google.dev</li>
        </ol>
        <p className="text-xs text-charcoal-muted pt-2">
          All data and statistics are from publicly available sources cited above. Figures may vary year to year; we recommend consulting the latest reports for up-to-date figures. KisanAlert is an independent project and is not affiliated with any of the cited organizations.
        </p>
      </section>

      {/* Footer link back */}
      <div className="text-center pb-8">
        <Link href="/" className="text-sm text-sage font-medium hover:underline">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  )
}
