/**
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement> & {
 *   variant?: 'primary' | 'ghost' | 'danger'
 * }} props
 */
export function Button({ variant = 'ghost', className = '', children, ...rest }) {
  const variants = {
    primary:
      'bg-explorer-accent text-white hover:brightness-110 focus-visible:ring-2 focus-visible:ring-explorer-accent',
    ghost:
      'text-explorer-text hover:bg-explorer-hover focus-visible:ring-2 focus-visible:ring-explorer-accent',
    danger: 'text-red-400 hover:bg-red-950/40 focus-visible:ring-2 focus-visible:ring-red-400',
  }

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-sm transition-colors focus:outline-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
