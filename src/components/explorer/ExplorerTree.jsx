import { useRef } from 'react'
import { TreeNode } from './TreeNode.jsx'
import { useExplorerActions } from './ExplorerActionsContext.jsx'
import { useTreeKeyboard } from '../../hooks/useTreeKeyboard.js'
import { useScrollToSelectedNode } from '../../hooks/useScrollToSelectedNode.js'

/**
 * @param {{
 *   nodes: import('../../types/node.js').TreeNode[]
 *   depth?: number
 * }} props
 */
export function ExplorerTree({ nodes, depth = 0 }) {
  const isRoot = depth === 0
  const treeRef = useRef(/** @type {HTMLUListElement | null} */ (null))
  const { onDelete } = useExplorerActions()
  const { handleKeyDown } = useTreeKeyboard({ onDelete, enabled: isRoot })

  useScrollToSelectedNode(isRoot)

  if (nodes.length === 0) return null

  return (
    <ul
      ref={isRoot ? treeRef : undefined}
      role={isRoot ? 'tree' : 'group'}
      aria-label={isRoot ? 'File tree' : undefined}
      className={isRoot ? 'py-1 outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-explorer-accent' : undefined}
      tabIndex={isRoot ? -1 : undefined}
      onKeyDown={isRoot ? handleKeyDown : undefined}
    >
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} depth={depth} />
      ))}
    </ul>
  )
}
