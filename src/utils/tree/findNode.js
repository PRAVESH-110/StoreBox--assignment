/**
 * @typedef {import('../../types/node.js').TreeNode} TreeNode
 */

/**
 * @typedef {Object} FindNodeResult
 * @property {TreeNode} node
 * @property {TreeNode | null} parent
 * @property {number} index
 */

/**
 * @param {TreeNode[]} nodes
 * @param {string} id
 * @param {TreeNode | null} [parent]
 * @returns {FindNodeResult | null}
 */
export function findNode(nodes, id, parent = null) {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]

    if (node.id === id) {
      return { node, parent, index }
    }

    if (node.type === 'folder' && node.children?.length) {
      const found = findNode(node.children, id, node)
      if (found) return found
    }
  }

  return null
}

/**
 * All descendant ids (not including the node itself).
 *
 * @param {TreeNode} node
 * @returns {string[]}
 */
export function collectDescendantIds(node) {
  if (node.type !== 'folder' || !node.children?.length) {
    return []
  }

  return node.children.flatMap((child) => [child.id, ...collectDescendantIds(child)])
}
