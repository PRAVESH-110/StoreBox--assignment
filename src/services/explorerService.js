import { EXPLORER_ACTIONS } from '../constants/explorerActions.js'
import { NODE_TYPES } from '../constants/nodeTypes.js'
import { createId } from '../utils/id.js'

/**
 * Thin orchestration layer: builds node payloads and dispatches actions.
 * Keeps components free of mutation details.
 *
 * @param {React.Dispatch<{ type: string, payload?: unknown }>} dispatch
 */
export function createExplorerService(dispatch) {
  return {
    /**
     * @param {string | null} parentId
     * @param {string} name
     */
    createFile(parentId, name) {
      dispatch({
        type: EXPLORER_ACTIONS.ADD_NODE,
        payload: {
          parentId,
          node: { id: createId(), name, type: NODE_TYPES.FILE },
        },
      })
    },

    /**
     * @param {string | null} parentId
     * @param {string} name
     */
    createFolder(parentId, name) {
      dispatch({
        type: EXPLORER_ACTIONS.ADD_NODE,
        payload: {
          parentId,
          node: { id: createId(), name, type: NODE_TYPES.FOLDER, children: [] },
        },
      })
    },

    /**
     * @param {string} id
     * @param {string} name
     */
    renameNode(id, name) {
      dispatch({
        type: EXPLORER_ACTIONS.EDIT_NODE,
        payload: { id, updates: { name } },
      })
    },

    /**
     * @param {string} id
     */
    deleteNode(id) {
      dispatch({ type: EXPLORER_ACTIONS.DELETE_NODE, payload: { id } })
    },

    /**
     * @param {string | null} id
     */
    selectNode(id) {
      dispatch({ type: EXPLORER_ACTIONS.SELECT_NODE, payload: { id } })
    },

    /**
     * @param {string} id
     */
    toggleExpanded(id) {
      dispatch({ type: EXPLORER_ACTIONS.TOGGLE_EXPANDED, payload: { id } })
    },

    /**
     * @param {string | null} id
     */
    setEditing(id) {
      dispatch({ type: EXPLORER_ACTIONS.SET_EDITING, payload: { id } })
    },
  }
}
