'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SplitText from '@/components/ui/SplitText'

export default function RootPage() {
  const router = useRouter()
  const [show] = useState(true)

  const handleComplete = () => {
    setTimeout(() => router.push('/dashboard'), 800)
  }

  return (
    <div className="fixed inset-0 bg-parchment flex flex-col items-center justify-center overflow-hidden">
      {show && (
        <>
          <div className="flex items-baseline">
            <SplitText
              text="Kisan"
              className="text-[clamp(3rem,12vw,10rem)] font-bold tracking-[-0.04em] text-charcoal"
              delay={80}
              duration={0.8}
              ease="power4.out"
              from={{ opacity: 0, y: 60 }}
              to={{ opacity: 1, y: 0 }}
            />
            <SplitText
              text="Alert"
              className="text-[clamp(3rem,12vw,10rem)] font-bold tracking-[-0.04em] text-terra ml-4"
              delay={100}
              duration={0.8}
              ease="power4.out"
              from={{ opacity: 0, y: 60 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={handleComplete}
            />
          </div>
          <p className="mt-6 text-xs text-charcoal-muted tracking-[0.25em] uppercase font-mono">
            Pest Intelligence System
          </p>
        </>
      )}
    </div>
  )
}
