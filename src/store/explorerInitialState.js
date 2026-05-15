import { INITIAL_TREE } from '../constants/initialTree.js'

/** @type {import('../types/explorer.js').ExplorerState} */
export const explorerInitialState = {
  tree: INITIAL_TREE,
  ui: {
    selectedId: null,
    expandedIds: new Set(),
    editingId: null,
  },
}
