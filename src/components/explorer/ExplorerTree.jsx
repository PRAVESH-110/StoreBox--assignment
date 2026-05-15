import { TreeNode } from './TreeNode.jsx'

/**
 * @param {{
 *   nodes: import('../../types/node.js').TreeNode[]
 *   depth?: number
 * }} props
 */
export function ExplorerTree({ nodes, depth = 0 }) {
  if (nodes.length === 0) return null

  const isRoot = depth === 0

  return (
    <ul
      role={isRoot ? 'tree' : 'group'}
      aria-label={isRoot ? 'File tree' : undefined}
      className={isRoot ? 'py-1' : undefined}
    >
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} depth={depth} />
      ))}
    </ul>
  )
}
