import { useEffect, useId, useRef } from 'react'

/**
 * Accessible modal frame: backdrop, focus on open, Escape to close.
 *
 * @param {{
 *   isOpen: boolean
 *   title: string
 *   onClose: () => void
 *   children: React.ReactNode
 *   footer?: React.ReactNode
 * }} props
 */
export function ModalShell({ isOpen, title, onClose, children, footer }) {
  const titleId = useId()
  const panelRef = useRef(/** @type {HTMLDivElement | null} */ (null))

  useEffect(() => {
    if (!isOpen) return undefined

    const previousFocus = document.activeElement

    const frame = requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelector(
        'input, button, [href], [tabindex]:not([tabindex="-1"])',
      )
      if (focusable instanceof HTMLElement) focusable.focus()
    })

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('keydown', onKeyDown)
      if (previousFocus instanceof HTMLElement) previousFocus.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md rounded-lg border border-explorer-border bg-explorer-sidebar p-5 shadow-xl"
      >
        <h2 id={titleId} className="mb-4 text-base font-medium text-explorer-text">
          {title}
        </h2>
        {children}
        {footer ? <div className="mt-5 flex justify-end gap-2">{footer}</div> : null}
      </div>
    </div>
  )
}
