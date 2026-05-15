/**
 * Subtle shortcut reference shown when the tree is visible.
 */
export function ExplorerKeyboardHints() {
  return (
    <p className="border-t border-explorer-border px-3 py-2 text-[10px] leading-relaxed text-explorer-muted">
      <span className="font-medium text-explorer-text">↑↓</span> navigate ·{' '}
      <span className="font-medium text-explorer-text">←→</span> collapse/expand ·{' '}
      <span className="font-medium text-explorer-text">F2</span> rename ·{' '}
      <span className="font-medium text-explorer-text">Del</span> delete
    </p>
  )
}
