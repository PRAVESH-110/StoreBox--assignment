import { NODE_TYPES } from '../../constants/nodeTypes.js'

/**
 * @typedef {import('../../types/node.js').TreeNode} TreeNode
 */

/**
 * @typedef {Object} FlatTreeEntry
 * @property {string} id
 * @property {TreeNode} node
 * @property {string | null} parentId
 */

/**
 * Depth-first list of nodes visible when folders in `expandedIds` are open.
 *
 * @param {TreeNode[]} nodes
 * @param {Set<string>} expandedIds
 * @param {string | null} [parentId]
 * @returns {FlatTreeEntry[]}
 */
export function flattenVisibleNodes(nodes, expandedIds, parentId = null) {
  /** @type {FlatTreeEntry[]} */
  const result = []

  for (const node of nodes) {
    result.push({ id: node.id, node, parentId })

    if (
      node.type === NODE_TYPES.FOLDER &&
      expandedIds.has(node.id) &&
      node.children?.length
    ) {
      result.push(...flattenVisibleNodes(node.children, expandedIds, node.id))
    }
  }

  return result
}
