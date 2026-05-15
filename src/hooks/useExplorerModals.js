import { useCallback, useState } from 'react'
import { NODE_TYPES } from '../constants/nodeTypes.js'

/**
 * @typedef {Object} CreateModalState
 * @property {'file' | 'folder'} nodeType
 * @property {string | null} parentId
 */

/**
 * @typedef {Object} DeleteModalState
 * @property {string} id
 * @property {string} name
 * @property {'file' | 'folder'} nodeType
 */

/**
 * Modal open/close state for create and delete flows.
 */
export function useExplorerModals() {
  const [createModal, setCreateModal] = useState(/** @type {CreateModalState | null} */ (null))
  const [deleteModal, setDeleteModal] = useState(/** @type {DeleteModalState | null} */ (null))

  const openCreateFile = useCallback((parentId = null) => {
    setCreateModal({ nodeType: NODE_TYPES.FILE, parentId })
  }, [])

  const openCreateFolder = useCallback((parentId = null) => {
    setCreateModal({ nodeType: NODE_TYPES.FOLDER, parentId })
  }, [])

  const closeCreateModal = useCallback(() => {
    setCreateModal(null)
  }, [])

  /**
   * @param {{ id: string, name: string, nodeType: 'file' | 'folder' }} target
   */
  const openDeleteModal = useCallback((target) => {
    setDeleteModal(target)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setDeleteModal(null)
  }, [])

  return {
    createModal,
    deleteModal,
    openCreateFile,
    openCreateFolder,
    closeCreateModal,
    openDeleteModal,
    closeDeleteModal,
  }
}
