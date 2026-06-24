'use client'

import { useRouter } from 'next/navigation'
import Stepper, { Step } from '@/components/ui/Stepper'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingPage() {
  const router = useRouter()

  const handleComplete = async () => {
    const supabase = createClient()
    await supabase.auth.updateUser({ data: { onboarded: true } })
    router.push('/dashboard')
  }

  return (
    <div className="fixed inset-0 bg-parchment flex items-center justify-center overflow-hidden">
      <Stepper
        initialStep={1}
        onFinalStepCompleted={handleComplete}
        nextButtonText="Next"
        disableStepIndicators
      >
        <Step>
          <StepTitle>
            Welcome to <span className="text-terra">KisanAlert</span>
          </StepTitle>
          <StepBody>
            Your AI-powered pest intelligence system. This short guide will walk you through the key features so you can start protecting your crops right away.
          </StepBody>
          <StepIcon>
            <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto mt-6">
              <circle cx="32" cy="32" r="28" stroke="#4A5D23" strokeWidth="2" fill="none"/>
              <path d="M32 48 C22 44 24 30 32 22 C40 30 42 44 32 48Z" fill="#4A5D23" opacity="0.15"/>
              <path d="M32 48 C22 44 24 30 32 22" stroke="#4A5D23" strokeWidth="2"/>
              <path d="M32 22 L32 48" stroke="#4A5D23" strokeWidth="1" strokeDasharray="3 3"/>
            </svg>
          </StepIcon>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">Step 1</span>
            Your Dashboard
          </StepTitle>
          <StepBody>
            The dashboard gives you a snapshot of current pest activity. You will see key metrics — active alerts, regions under watch, and overall risk — plus a live map and top affected districts.
          </StepBody>
          <StepTip>
            Tip: The risk score updates automatically as new reports come in.
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">Step 2</span>
            Upload &amp; Detect
          </StepTitle>
          <StepBody>
            Snap a photo of an affected crop and upload it. KisanAlert uses Gemini AI to identify the pest or disease, estimate severity, and suggest the affected crop — all in seconds.
          </StepBody>
          <StepTip>
            Tip: Good lighting and a clear close-up of the affected area gives the best results.
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">Step 3</span>
            Explore the Map
          </StepTitle>
          <StepBody>
            The outbreak map shows all reported pest incidents across India. Each marker is colour-coded by severity — critical (red), high (amber), moderate (green), low (light green). Click any marker for details.
          </StepBody>
          <StepTip>
            Tip: Use the district filter to zoom in on your area.
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">Step 4</span>
            Browse Reports
          </StepTitle>
          <StepBody>
            The reports page lists every pest report with filters for severity, status, district, and date. Expand any row to see the full diagnosis including AI analysis, uploaded image, and actions taken.
          </StepBody>
          <StepTip>
            Tip: Toggle "My Reports" to see only reports you have submitted.
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">Step 5</span>
            Alerts &amp; Settings
          </StepTitle>
          <StepBody>
            Configure SMS and email alerts so you never miss an outbreak in your region. You can also switch between 5 supported languages: English, Hindi, Marathi, Telugu, and Kannada.
          </StepBody>
          <StepTip>
            Tip: Enable Critical Only mode to receive alerts only for high-severity outbreaks.
          </StepTip>
        </Step>

        <Step>
          <StepTitle>You are all set</StepTitle>
          <StepBody>
            You are ready to start using KisanAlert. Begin by exploring your dashboard or upload your first crop photo for AI analysis.
          </StepBody>
          <StepIcon>
            <svg viewBox="0 0 64 64" fill="none" className="w-16 h-16 mx-auto mt-6">
              <circle cx="32" cy="32" r="28" stroke="#4A5D23" strokeWidth="2" fill="none"/>
              <path d="M22 32 L30 40 L42 26" stroke="#4A5D23" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
          </StepIcon>
        </Step>
      </Stepper>
    </div>
  )
}

function StepTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-2xl font-bold text-charcoal mb-3"
      style={{ fontFamily: 'var(--font-display), Georgia, serif', letterSpacing: '-0.02em' }}
    >
      {children}
    </h2>
  )
}

function StepBody({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-charcoal-muted leading-relaxed">{children}</p>
  )
}

function StepTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 pt-3 border-t border-stone">
      <p className="text-xs text-charcoal-muted/60 leading-relaxed">{children}</p>
    </div>
  )
}

function StepIcon({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
