import { ModalShell } from '../common/ModalShell.jsx'
import { Button } from '../common/Button.jsx'
import { NODE_TYPES } from '../../constants/nodeTypes.js'

/**
 * @param {{
 *   isOpen: boolean
 *   nodeName: string
 *   nodeType: import('../../types/node.js').NodeType
 *   onClose: () => void
 *   onConfirm: () => void
 * }} props
 */
export function DeleteNodeModal({ isOpen, nodeName, nodeType, onClose, onConfirm }) {
  const isFolder = nodeType === NODE_TYPES.FOLDER
  const title = isFolder ? 'Delete Folder' : 'Delete File'

  return (
    <ModalShell
      isOpen={isOpen}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm()
              onClose()
            }}
          >
            Delete
          </Button>
        </>
      }
    >
      <p className="text-sm text-explorer-text">
        {isFolder ? (
          <>
            Delete folder <span className="font-medium text-white">&quot;{nodeName}&quot;</span> and
            everything inside it? This cannot be undone.
          </>
        ) : (
          <>
            Delete file <span className="font-medium text-white">&quot;{nodeName}&quot;</span>? This
            cannot be undone.
          </>
        )}
      </p>
    </ModalShell>
  )
}
