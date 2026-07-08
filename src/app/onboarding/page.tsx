'use client'

import { useRouter } from 'next/navigation'
import Stepper, { Step } from '@/components/ui/Stepper'
import { createClient } from '@/lib/supabase/client'
import { useLocale } from '@/lib/i18n/LocaleProvider'

export default function OnboardingPage() {
  const router = useRouter()
  const { dict } = useLocale()

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
        nextButtonText={dict.onboarding.next}
        doneButtonText={dict.onboarding.done}
        disableStepIndicators
      >
        <Step>
          <StepTitle>
            {dict.onboarding.welcomeTitle.split('Apentomos')[0]}<span className="text-terra">Apentomos</span>
          </StepTitle>
          <StepBody>
            {dict.onboarding.welcomeBody}
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
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">{dict.onboarding.stepLabel} 1</span>
            {dict.onboarding.step1Title}
          </StepTitle>
          <StepBody>
            {dict.onboarding.step1Body}
          </StepBody>
          <StepTip>
            {dict.onboarding.step1Tip}
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">{dict.onboarding.stepLabel} 2</span>
            {dict.onboarding.step2Title}
          </StepTitle>
          <StepBody>
            {dict.onboarding.step2Body}
          </StepBody>
          <StepTip>
            {dict.onboarding.step2Tip}
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">{dict.onboarding.stepLabel} 3</span>
            {dict.onboarding.step3Title}
          </StepTitle>
          <StepBody>
            {dict.onboarding.step3Body}
          </StepBody>
          <StepTip>
            {dict.onboarding.step3Tip}
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">{dict.onboarding.stepLabel} 4</span>
            {dict.onboarding.step4Title}
          </StepTitle>
          <StepBody>
            {dict.onboarding.step4Body}
          </StepBody>
          <StepTip>
            {dict.onboarding.step4Tip}
          </StepTip>
        </Step>

        <Step>
          <StepTitle>
            <span className="text-charcoal-muted text-xs font-mono tracking-[0.2em] uppercase block mb-2 font-sans">{dict.onboarding.stepLabel} 5</span>
            {dict.onboarding.step5Title}
          </StepTitle>
          <StepBody>
            {dict.onboarding.step5Body}
          </StepBody>
          <StepTip>
            {dict.onboarding.step5Tip}
          </StepTip>
        </Step>

        <Step>
          <StepTitle>{dict.onboarding.finalTitle}</StepTitle>
          <StepBody>
            {dict.onboarding.finalBody}
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
