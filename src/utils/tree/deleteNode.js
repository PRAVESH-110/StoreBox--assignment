/**
 * @typedef {import('../../types/node.js').TreeNode} TreeNode
 */

/**
 * @param {TreeNode[]} nodes
 * @param {string} id
 * @returns {TreeNode[]}
 */
export function deleteNode(nodes, id) {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.type === 'folder' && node.children?.length) {
        return { ...node, children: deleteNode(node.children, id) }
      }
      return node
    })
}
