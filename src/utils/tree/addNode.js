import { NODE_TYPES } from '../../constants/nodeTypes.js'
import { findNode } from './findNode.js'

/**
 * @typedef {import('../../types/node.js').TreeNode} TreeNode
 */

/**
 * @param {TreeNode[]} nodes
 * @param {string | null} parentId - null inserts at workspace root
 * @param {TreeNode} node
 * @returns {TreeNode[]}
 */
export function addNode(nodes, parentId, node) {
  if (parentId === null) {
    return [...nodes, node]
  }

  const parentResult = findNode(nodes, parentId)
  if (!parentResult || parentResult.node.type !== NODE_TYPES.FOLDER) {
    return nodes
  }

  return insertUnderParent(nodes, parentId, node)
}

/**
 * @param {TreeNode[]} nodes
 * @param {string} parentId
 * @param {TreeNode} node
 * @returns {TreeNode[]}
 */
function insertUnderParent(nodes, parentId, node) {
  return nodes.map((current) => {
    if (current.id === parentId && current.type === NODE_TYPES.FOLDER) {
      const children = current.children ?? []
      return { ...current, children: [...children, node] }
    }

    if (current.type === NODE_TYPES.FOLDER && current.children?.length) {
      return {
        ...current,
        children: insertUnderParent(current.children, parentId, node),
      }
    }

    return current
  })
}
