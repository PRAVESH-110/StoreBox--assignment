/**
 * @typedef {import('./node.js').TreeNode} TreeNode
 */

/**
 * @typedef {Object} ExplorerUIState
 * @property {string | null} selectedId
 * @property {Set<string>} expandedIds
 * @property {string | null} editingId - Node currently in inline-rename mode
 */

/**
 * @typedef {Object} ExplorerState
 * @property {TreeNode[]} tree - Root-level nodes (virtual workspace root)
 * @property {ExplorerUIState} ui
 */

export {}
