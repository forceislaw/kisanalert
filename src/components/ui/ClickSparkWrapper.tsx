'use client'

import ClickSpark from './ClickSpark'

export default function ClickSparkWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ClickSpark sparkColor="#E07A5F" sparkSize={8} sparkRadius={12} sparkCount={6} duration={400}>
      {children}
    </ClickSpark>
  )
}
