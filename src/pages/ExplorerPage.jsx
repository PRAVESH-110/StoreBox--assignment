import { useCallback, useEffect, useMemo } from 'react'
import {
  ExplorerLayout,
  ExplorerToolbar,
  ExplorerTree,
  ExplorerEmptyState,
  ExplorerActionsProvider,
  ExplorerKeyboardHints,
} from '../components/explorer/index.js'
import { CreateNodeModal, DeleteNodeModal } from '../components/modals/index.js'
import { useExplorer } from '../hooks/useExplorer.js'
import { useExplorerModals } from '../hooks/useExplorerModals.js'
import { NODE_TYPES } from '../constants/nodeTypes.js'
import { findNode } from '../utils/tree/index.js'

export function ExplorerPage() {
  const { state, explorer } = useExplorer()
  const {
    createModal,
    deleteModal,
    openCreateFile,
    openCreateFolder,
    closeCreateModal,
    closeDeleteModal,
    openDeleteModal,
  } = useExplorerModals()

  const isEmpty = state.tree.length === 0

  const defaultParentId = useMemo(() => {
    const { selectedId } = state.ui
    if (!selectedId) return null
    const found = findNode(state.tree, selectedId)
    if (!found || found.node.type !== NODE_TYPES.FOLDER) return null
    return found.node.id
  }, [state.tree, state.ui.selectedId])

  const handleCreateFile = useCallback(() => {
    openCreateFile(defaultParentId)
  }, [openCreateFile, defaultParentId])

  const handleCreateFolder = useCallback(() => {
    openCreateFolder(defaultParentId)
  }, [openCreateFolder, defaultParentId])

  const handleCreateSubmit = useCallback(
    (name) => {
      if (!createModal) return

      if (createModal.nodeType === NODE_TYPES.FILE) {
        explorer.createFile(createModal.parentId, name)
      } else {
        explorer.createFolder(createModal.parentId, name)
      }
      closeCreateModal()
    },
    [createModal, explorer, closeCreateModal],
  )

  const handleDeleteConfirm = useCallback(() => {
    if (!deleteModal) return
    explorer.deleteNode(deleteModal.id)
  }, [deleteModal, explorer])

  const explorerActions = useMemo(
    () => ({
      onCreateFile: openCreateFile,
      onCreateFolder: openCreateFolder,
      onDelete: openDeleteModal,
    }),
    [openCreateFile, openCreateFolder, openDeleteModal],
  )

  const selectedNode = useMemo(() => {
    if (!state.ui.selectedId) return null
    return findNode(state.tree, state.ui.selectedId)?.node ?? null
  }, [state.tree, state.ui.selectedId])

  useEffect(() => {
    if (state.tree.length > 0 && !state.ui.selectedId) {
      explorer.selectNode(state.tree[0].id)
    }
  }, [state.tree, state.ui.selectedId, explorer])

  const sidebar = (
    <ExplorerActionsProvider value={explorerActions}>
      <ExplorerToolbar
        onCreateFile={handleCreateFile}
        onCreateFolder={handleCreateFolder}
      />
      <nav className="flex-1 overflow-y-auto" aria-label="Workspace files">
        {isEmpty ? (
          <ExplorerEmptyState
            onCreateFile={handleCreateFile}
            onCreateFolder={handleCreateFolder}
          />
        ) : (
          <>
            <ExplorerTree nodes={state.tree} />
            <ExplorerKeyboardHints />
          </>
        )}
      </nav>
    </ExplorerActionsProvider>
  )

  return (
    <>
      <ExplorerLayout sidebar={sidebar}>
        <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-sm text-explorer-muted">
          {isEmpty ? (
            <p>Select or create a file to preview content here.</p>
          ) : selectedNode ? (
            <>
              <p className="text-explorer-text">{selectedNode.name}</p>
              <p className="text-xs uppercase tracking-wide">
                {selectedNode.type === NODE_TYPES.FOLDER ? 'Folder' : 'File'}
              </p>
            </>
          ) : (
            <p>Select an item in the explorer.</p>
          )}
        </div>
      </ExplorerLayout>

      <CreateNodeModal
        isOpen={Boolean(createModal)}
        nodeType={createModal?.nodeType ?? NODE_TYPES.FILE}
        onClose={closeCreateModal}
        onSubmit={handleCreateSubmit}
      />

      <DeleteNodeModal
        isOpen={Boolean(deleteModal)}
        nodeName={deleteModal?.name ?? ''}
        nodeType={deleteModal?.nodeType ?? NODE_TYPES.FILE}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </>
  )
}
