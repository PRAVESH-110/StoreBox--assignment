import { useEffect } from 'react'
import { useExplorer } from './useExplorer.js'

const TREE_NODE_SELECTOR = '[data-tree-node-id]'

/**
 * Keeps the selected tree row in view inside the scrollable sidebar.
 */
/**
 * @param {boolean} [enabled]
 */
export function useScrollToSelectedNode(enabled = true) {
  const { state } = useExplorer()
  const { selectedId, editingId } = state.ui

  useEffect(() => {
    if (!enabled || !selectedId) return

    const frame = requestAnimationFrame(() => {
      const element = document.querySelector(
        `${TREE_NODE_SELECTOR}[data-tree-node-id="${selectedId}"]`,
      )
      element?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    })

    return () => cancelAnimationFrame(frame)
  }, [enabled, selectedId, state.tree, editingId])
}
