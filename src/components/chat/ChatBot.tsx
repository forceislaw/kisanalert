'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your farming assistant. Ask me about crops, pests, soil, or any agriculture topic.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [nonFarming, setNonFarming] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  async function send() {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setNonFarming(false)
    setMessages(prev => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const history = messages.slice(1).map(m => ({ role: m.role, content: m.content }))
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      })
      const data = await res.json()
      if (data.nonFarming) setNonFarming(true)
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || data.error || 'Sorry, something went wrong.' }])
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sage/20 overflow-hidden flex flex-col animate-in slide-in-from-right-8 fade-in duration-200">
          <div className="bg-sage-dark text-white px-4 py-3 flex items-center justify-between">
            <span className="font-semibold text-sm">🌾 Kisaan Saathi</span>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-lg leading-none">&times;</button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-3 max-h-80" style={{ minHeight: 200 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-sage text-white rounded-br-sm'
                    : 'bg-parchment text-ink border border-sage/10 rounded-bl-sm'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-parchment text-ink border border-sage/10 rounded-xl rounded-bl-sm px-3 py-2 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-1.5 h-1.5 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                    <span className="w-1.5 h-1.5 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {nonFarming && (
            <div className="px-3 pb-1 text-xs text-terra">
              Only farming &amp; agriculture questions are supported.
            </div>
          )}

          <div className="border-t border-sage/10 p-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask about crops, pests..."
              className="flex-1 px-3 py-2 text-sm border border-sage/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/30 bg-parchment/50"
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 py-2 bg-sage-dark text-white text-sm rounded-lg hover:bg-sage-dark/90 disabled:opacity-40 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full bg-sage-dark text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center text-2xl animate-in fade-in"
      >
        {open ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        )}
      </button>
    </div>
  )
}
