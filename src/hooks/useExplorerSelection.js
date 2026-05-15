import { useExplorer } from './useExplorer.js'

/**
 * Convenience hook for selection + expansion UI state.
 */
export function useExplorerSelection() {
  const { state, explorer } = useExplorer()
  const { selectedId, expandedIds, editingId } = state.ui

  return {
    selectedId,
    expandedIds,
    editingId,
    isSelected: (id) => selectedId === id,
    isExpanded: (id) => expandedIds.has(id),
    isEditing: (id) => editingId === id,
    select: explorer.selectNode,
    toggleExpanded: explorer.toggleExpanded,
    setEditing: explorer.setEditing,
  }
}
