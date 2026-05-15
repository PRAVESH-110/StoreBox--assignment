import { EXPLORER_ACTIONS } from '../constants/explorerActions.js'
import { PRODUCT_DECISIONS } from '../constants/productDecisions.js'
import { NODE_TYPES } from '../constants/nodeTypes.js'
import { addNode, editNode, deleteNode, findNode, collectDescendantIds } from '../utils/tree/index.js'

/**
 * @param {import('../types/explorer.js').ExplorerState} state
 * @param {{ type: string, payload?: unknown }} action
 * @returns {import('../types/explorer.js').ExplorerState}
 */
export function explorerReducer(state, action) {
  switch (action.type) {
    case EXPLORER_ACTIONS.SELECT_NODE:
      return {
        ...state,
        ui: { ...state.ui, selectedId: /** @type {{ id: string | null }} */ (action.payload).id },
      }

    case EXPLORER_ACTIONS.TOGGLE_EXPANDED: {
      const { id } = /** @type {{ id: string }} */ (action.payload)
      const expandedIds = new Set(state.ui.expandedIds)
      if (expandedIds.has(id)) expandedIds.delete(id)
      else expandedIds.add(id)
      return { ...state, ui: { ...state.ui, expandedIds } }
    }

    case EXPLORER_ACTIONS.SET_EDITING:
      return {
        ...state,
        ui: {
          ...state.ui,
          editingId: /** @type {{ id: string | null }} */ (action.payload).id,
        },
      }

    case EXPLORER_ACTIONS.ADD_NODE: {
      const { parentId, node } = /** @type {{ parentId: string | null, node: import('../types/node.js').TreeNode }} */ (
        action.payload
      )
      const expandedIds = new Set(state.ui.expandedIds)

      if (PRODUCT_DECISIONS.EXPAND_NEW_FOLDERS && node.type === NODE_TYPES.FOLDER) {
        expandedIds.add(node.id)
      }

      if (parentId) {
        expandedIds.add(parentId)
      }

      return {
        ...state,
        tree: addNode(state.tree, parentId, node),
        ui: { ...state.ui, expandedIds, selectedId: node.id },
      }
    }

    case EXPLORER_ACTIONS.EDIT_NODE: {
      const { id, updates } = /** @type {{ id: string, updates: { name: string } }} */ (action.payload)
      return { ...state, tree: editNode(state.tree, id, updates) }
    }

    case EXPLORER_ACTIONS.DELETE_NODE: {
      const { id } = /** @type {{ id: string }} */ (action.payload)
      const nextUi = { ...state.ui }
      const found = findNode(state.tree, id)
      const idsToClear = found
        ? [id, ...collectDescendantIds(found.node)]
        : [id]

      if (nextUi.selectedId && idsToClear.includes(nextUi.selectedId)) {
        nextUi.selectedId = null
      }
      if (nextUi.editingId && idsToClear.includes(nextUi.editingId)) {
        nextUi.editingId = null
      }

      nextUi.expandedIds = new Set(
        [...nextUi.expandedIds].filter((eid) => !idsToClear.includes(eid)),
      )

      return { ...state, tree: deleteNode(state.tree, id), ui: nextUi }
    }

    default:
      return state
  }
}
