/**
 * @typedef {import('../../types/node.js').TreeNode} TreeNode
 */

/**
 * @param {TreeNode[]} nodes
 * @param {string} id
 * @param {Partial<Pick<TreeNode, 'name'>>} updates
 * @returns {TreeNode[]}
 */
export function editNode(nodes, id, updates) {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, ...updates }
    }

    if (node.type === 'folder' && node.children?.length) {
      return { ...node, children: editNode(node.children, id, updates) }
    }

    return node
  })
}
