'use client'

import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    // focus the input when modal opens
    setTimeout(() => inputRef.current?.focus(), 0)

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const router = useRouter()

  const handleSearch = (e?: any) => {
    e?.preventDefault()
    const q = inputRef.current?.value?.trim() || ''
    // navigate to search page with query
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`)
    }
    // close modal (navigation or empty query)
    onClose()
  }

  return (
    <div
      className="react-modal-overlay"
      onMouseDown={(e) => {
        // if click is outside the dialog, close
        if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
          onClose()
        }
      }}
      aria-hidden={!open}
    >
      <div
        className="react-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Arama"
        ref={dialogRef}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="react-modal-content">
          <form className="react-modal-body" onSubmit={handleSearch}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                ref={inputRef}
                type="text"
                className="form-control"
                placeholder="Somet'de arayın..."
                aria-label="Arama"
                style={{ flex: 1 }}
              />
              <button
                type="submit"
                className="react-modal-submit"
                aria-label="Ara"
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
