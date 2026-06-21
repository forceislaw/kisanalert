import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="border border-stone bg-parchment-tint p-6 max-w-md text-center">
        <h2 className="text-lg font-bold text-charcoal mb-2">Page not found</h2>
        <p className="text-sm text-charcoal-muted mb-4">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/dashboard" className="btn-primary text-sm px-4 py-1.5 inline-block">
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
