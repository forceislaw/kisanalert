'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocale } from '@/lib/i18n/LocaleProvider'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const QUIL_LOGO = (
  <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2z" fill="#2D6A4F" opacity="0.2"/>
    <path d="M16 6c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10S21.523 6 16 6z" fill="#2D6A4F" opacity="0.35"/>
    <path d="M16 9a3 3 0 0 0-3 3c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3z" fill="#52B788"/>
    <path d="M20 19c0-2.21-1.79-4-4-4s-4 1.79-4 4v4h8v-4z" fill="#52B788"/>
    <path d="M11 17.5c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2z" fill="#40916C"/>
    <path d="M25 17.5c0-1.105-.895-2-2-2s-2 .895-2 2 .895 2 2 2 2-.895 2-2z" fill="#40916C"/>
  </svg>
)

const SEND_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
  </svg>
)

const MIC_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
    <path d="M10 3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0z"/>
  </svg>
)

const STOP_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
  </svg>
)

export default function ChatBot() {
  const { dict } = useLocale()
  const [open, setOpen] = useState(false)
  const [greeted, setGreeted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [nonFarming, setNonFarming] = useState(false)
  const [recording, setRecording] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  const greet = useCallback(() => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }, [])

  useEffect(() => {
    if (open && !greeted) {
      setGreeted(true)
      setMessages([{
        role: 'assistant',
        content: `${greet()}! I'm Bob, your farming assistant. Ask me about crops, pests, soil, or any agriculture topic. I speak multiple languages — just ask!`,
      }])
    }
  }, [open, greeted, greet])

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
      const history = messages.slice().map(m => ({ role: m.role, content: m.content }))
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

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mimeType = [
        'audio/webm;codecs=opus',
        'audio/webm',
        'audio/ogg;codecs=opus',
        'audio/mp4',
      ].find(t => MediaRecorder.isTypeSupported(t)) || ''
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : {})
      chunksRef.current = []
      mediaRecorderRef.current = recorder

      const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('ogg') ? 'ogg' : 'webm'

      recorder.ondataavailable = e => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = async () => {
        stream.getTracks().forEach(t => t.stop())
        const blob = new Blob(chunksRef.current, { type: `audio/${ext}` })
        if (blob.size < 1000) return
        await transcribe(blob)
      }

      recorder.start()
      setRecording(true)
    } catch (e) {
      console.error('Mic error:', e)
      setRecording(false)
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setRecording(false)
  }

  async function transcribe(audioBlob: Blob) {
    setTranscribing(true)
    try {
      const formData = new FormData()
      formData.append('audio', audioBlob)
      const res = await fetch('/api/chat/transcribe', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.text) {
        setInput(data.text)
        inputRef.current?.focus()
      }
    } catch {
      // silent
    } finally {
      setTranscribing(false)
    }
  }

  const icon = open ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="bob-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
  ) : (
    <span className="bob-icon">{QUIL_LOGO}</span>
  )

  return (
    <div className="fixed sm:bottom-6 bottom-20 right-6 z-50 flex flex-col items-end">
      {open && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-sage/20 overflow-hidden flex flex-col animate-in slide-in-from-right-8 fade-in duration-200">
          <div className="bg-sage-dark text-white px-4 py-3 flex items-center gap-2.5">
            <div className="flex-shrink-0">{QUIL_LOGO}</div>
            <span className="font-semibold text-sm tracking-wide">Bob</span>
            <span className="ml-auto text-[10px] text-white/50 uppercase tracking-wider">{dict.chat.farmingAI}</span>
            <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white text-lg leading-none ml-1">&times;</button>
          </div>

          <div ref={listRef} className="flex-1 overflow-y-auto p-3 space-y-3 max-h-80" style={{ minHeight: 200 }}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-sage-dark text-white rounded-br-sm'
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
              {dict.chat.nonFarmingWarning}
            </div>
          )}

          <div className="border-t border-sage/10 p-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={dict.chat.placeholder}
              className="flex-1 px-3 py-2 text-sm border border-sage/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage/30 bg-parchment/50"
              disabled={loading || transcribing}
            />
            <button
              onClick={recording ? stopRecording : startRecording}
              disabled={transcribing}
              className={`px-2.5 py-2 rounded-lg text-sm transition-colors ${
                recording
                  ? 'bg-terra text-white animate-pulse'
                  : 'bg-parchment text-ink border border-sage/20 hover:bg-sage/10'
              } disabled:opacity-40`}
              title={recording ? 'Stop recording' : 'Record voice'}
            >
              {transcribing ? (
                <span className="inline-flex gap-0.5">
                  <span className="w-1 h-1 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1 h-1 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1 h-1 bg-sage-dark rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              ) : recording ? STOP_ICON : MIC_ICON}
            </button>
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="px-3 py-2 bg-sage-dark text-white rounded-lg hover:bg-sage-dark/90 disabled:opacity-40 transition-colors flex items-center"
            >
              {loading ? (
                <span className="inline-flex gap-0.5">
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                  <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                </span>
              ) : SEND_ICON}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(o => !o)}
        className="w-14 h-14 rounded-full bg-sage-dark text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center bob-btn"
      >
        {icon}
      </button>

      <style jsx>{`
        .bob-btn {
          animation: bobPulse 2s ease-in-out infinite;
        }
        .bob-icon {
          transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        :global(.bob-btn:hover) .bob-icon {
          transform: rotate(90deg);
        }
        @keyframes bobPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(45, 106, 79, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(45, 106, 79, 0); }
        }
      `}</style>
    </div>
  )
}
