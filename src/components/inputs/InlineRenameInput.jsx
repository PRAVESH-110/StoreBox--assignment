import { useEffect, useRef, useState } from 'react'

/**
 * Compact inline rename field (used on tree rows in Section 6).
 *
 * @param {{
 *   initialValue: string
 *   onCommit: (value: string) => void
 *   onCancel: () => void
 * }} props
 */
export function InlineRenameInput({ initialValue, onCommit, onCancel }) {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef(/** @type {HTMLInputElement | null} */ (null))

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  const commit = () => {
    const trimmed = value.trim()
    if (!trimmed) {
      onCancel()
      return
    }
    onCommit(trimmed)
  }

  return (
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      onBlur={commit}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          commit()
        }
        if (event.key === 'Escape') {
          event.preventDefault()
          onCancel()
        }
      }}
      className="min-w-0 flex-1 rounded border border-explorer-accent bg-explorer-bg px-1.5 py-0.5 text-sm text-explorer-text outline-none focus:ring-1 focus:ring-explorer-accent"
      aria-label="Rename"
    />
  )
}
