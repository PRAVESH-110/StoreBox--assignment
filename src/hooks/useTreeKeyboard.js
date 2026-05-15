import { useCallback } from 'react'
import { NODE_TYPES } from '../constants/nodeTypes.js'
import { flattenVisibleNodes } from '../utils/tree/flattenVisibleNodes.js'
import { findNode } from '../utils/tree/index.js'
import { useExplorer } from './useExplorer.js'

/**
 * WAI-ARIA tree keyboard pattern for the file explorer.
 *
 * @param {{
 *   onDelete: (target: { id: string, name: string, nodeType: 'file' | 'folder' }) => void
 *   enabled?: boolean
 * }} options
 */
export function useTreeKeyboard({ onDelete, enabled = true }) {
  const { state, explorer } = useExplorer()
  const { tree } = state
  const { selectedId, expandedIds, editingId } = state.ui

  const handleKeyDown = useCallback(
    (event) => {
      if (!enabled || editingId) return

      const flat = flattenVisibleNodes(tree, expandedIds)
      if (flat.length === 0) return

      const currentIndex = selectedId
        ? flat.findIndex((entry) => entry.id === selectedId)
        : -1

      const selectByIndex = (index) => {
        const entry = flat[index]
        if (entry) explorer.selectNode(entry.id)
      }

      const getCurrent = () => {
        if (currentIndex < 0) return null
        return flat[currentIndex]
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault()
          if (currentIndex < 0) selectByIndex(0)
          else if (currentIndex < flat.length - 1) selectByIndex(currentIndex + 1)
          break
        }
        case 'ArrowUp': {
          event.preventDefault()
          if (currentIndex < 0) selectByIndex(flat.length - 1)
          else if (currentIndex > 0) selectByIndex(currentIndex - 1)
          break
        }
        case 'ArrowRight': {
          event.preventDefault()
          const current = getCurrent()
          if (!current) {
            selectByIndex(0)
            break
          }
          if (current.node.type === NODE_TYPES.FOLDER) {
            if (!expandedIds.has(current.id)) {
              explorer.toggleExpanded(current.id)
            } else if (current.node.children?.length) {
              selectByIndex(currentIndex + 1)
            }
          }
          break
        }
        case 'ArrowLeft': {
          event.preventDefault()
          const current = getCurrent()
          if (!current) break

          if (
            current.node.type === NODE_TYPES.FOLDER &&
            expandedIds.has(current.id)
          ) {
            explorer.toggleExpanded(current.id)
          } else if (current.parentId) {
            explorer.selectNode(current.parentId)
          }
          break
        }
        case 'Home': {
          event.preventDefault()
          selectByIndex(0)
          break
        }
        case 'End': {
          event.preventDefault()
          selectByIndex(flat.length - 1)
          break
        }
        case 'Enter':
        case ' ': {
          event.preventDefault()
          const current = getCurrent()
          if (current?.node.type === NODE_TYPES.FOLDER) {
            explorer.toggleExpanded(current.id)
          }
          break
        }
        case 'F2': {
          event.preventDefault()
          if (selectedId) explorer.setEditing(selectedId)
          break
        }
        case 'Delete':
        case 'Backspace': {
          if (!selectedId) break
          const found = findNode(tree, selectedId)
          if (!found) break
          event.preventDefault()
          onDelete({
            id: found.node.id,
            name: found.node.name,
            nodeType: found.node.type,
          })
          break
        }
        default:
          break
      }
    },
    [enabled, editingId, tree, expandedIds, selectedId, explorer, onDelete],
  )

  return { handleKeyDown }
}
