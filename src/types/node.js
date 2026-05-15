/**
 * @typedef {'file' | 'folder'} NodeType
 */

/**
 * @typedef {Object} TreeNode
 * @property {string} id - Stable unique identifier
 * @property {string} name - Display name
 * @property {NodeType} type
 * @property {TreeNode[]} [children] - Present when type is "folder"
 */

export {}
