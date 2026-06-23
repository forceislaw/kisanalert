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
    <div className="fixed inset-0 bg-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      {show && (
        <>
          <SplitText
            text="KISAN"
            className="text-[clamp(4rem,15vw,12rem)] font-bold tracking-[-0.04em] text-white"
            delay={80}
            duration={0.8}
            ease="power4.out"
            from={{ opacity: 0, y: 80, rotateX: -30 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
          />
          <SplitText
            text="ALERT"
            className="text-[clamp(4rem,15vw,12rem)] font-bold tracking-[-0.04em] text-[#CC3333] -mt-[0.08em]"
            delay={100}
            duration={0.8}
            ease="power4.out"
            from={{ opacity: 0, y: 80, rotateX: -30 }}
            to={{ opacity: 1, y: 0, rotateX: 0 }}
            onLetterAnimationComplete={handleComplete}
          />
          <p className="mt-6 text-sm text-white/20 tracking-[0.3em] uppercase font-mono">
            Pest Intelligence System
          </p>
        </>
      )}
    </div>
  )
}
