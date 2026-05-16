const ICONS = {
  file: (
    <path
      fill="currentColor"
      d="M5 3h6l2 2v12H5V3zm6 0v2h2l-2-2zM7 7h6v1H7V7zm0 3h6v1H7v-1zm0 3h4v1H7v-1z"
    />
  ),
  folder: (
    <path
      fill="currentColor"
      d="M4 5h6l1 1h7v10H4V5zm1 2v8h12V8H10L9 7H5v0z"
    />
  ),
  folderOpen: (
    <path
      fill="currentColor"
      d="M4 5h6l1 1h9v2H3v9h14V8h-8L8 7H5v-2z"
    />
  ),
  chevronRight: (
    <path fill="currentColor" d="M8 6l4 4-4 4V6z" />
  ),
  chevronDown: (
    /** Wide end at top, tip points down (∨) */
    <path fill="currentColor" d="M7 9.5L12 16L17 9.5z" />
  ),
  plus: (
    <path fill="currentColor" d="M11 5v6H5v2h6v6h2v-6h6v-2h-6V5h-2z" />
  ),
  edit: (
    <path
      fill="currentColor"
      d="M4 17.5V20h2.5L17 9.5 14.5 7 4 17.5zm14.7-9.8a1 1 0 0 0 0-1.4l-1-1a1 1 0 0 0-1.4 0l-1 1 2.4 2.4 1-1z"
    />
  ),
  trash: (
    <path
      fill="currentColor"
      d="M9 3h6l1 2h5v2H4V5h5l1-2zm1 6h2v9h-2V9zm4 0h2v9h-2V9zM7 9h2v9H7V9z"
    />
  ),
}

/**
 * @param {{ name: keyof typeof ICONS, className?: string, label?: string }} props
 */
export function Icon({ name, className = 'block h-4 w-4', label }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : 'presentation'}
    >
      {ICONS[name]}
    </svg>
  )
}
