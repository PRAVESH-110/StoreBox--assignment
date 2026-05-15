import { useId } from 'react'

/**
 * Controlled text input with label and error message.
 *
 * @param {{
 *   label: string
 *   value: string
 *   onChange: (value: string) => void
 *   error?: string
 *   placeholder?: string
 *   autoFocus?: boolean
 *   onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
 *   inputRef?: React.Ref<HTMLInputElement>
 * }} props
 */
export function TextField({
  label,
  value,
  onChange,
  error,
  placeholder,
  autoFocus = false,
  onKeyDown,
  inputRef,
}) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm text-explorer-muted">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onKeyDown={onKeyDown}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={`w-full rounded border bg-explorer-bg px-3 py-2 text-sm text-explorer-text outline-none transition-colors placeholder:text-explorer-muted focus:ring-2 focus:ring-explorer-accent ${
          error ? 'border-red-500' : 'border-explorer-border'
        }`}
      />
      {error ? (
        <p id={errorId} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
