import { useExplorer } from '../../hooks/useExplorer.js'
import { useExplorerSelection } from '../../hooks/useExplorerSelection.js'
import { NODE_TYPES } from '../../constants/nodeTypes.js'
import { Button } from '../common/Button.jsx'
import { Icon } from '../common/Icon.jsx'
import { InlineRenameInput } from '../inputs/InlineRenameInput.jsx'
import { ExplorerTree } from './ExplorerTree.jsx'
import { useExplorerActions } from './ExplorerActionsContext.jsx'

const INDENT_PX = 16

/**
 * @param {{
 *   node: import('../../types/node.js').TreeNode
 *   depth: number
 * }} props
 */
export function TreeNode({ node, depth }) {
  const { explorer } = useExplorer()
  const { isSelected, isExpanded, isEditing, select, toggleExpanded, setEditing } =
    useExplorerSelection()
  const { onCreateFile, onCreateFolder, onDelete } = useExplorerActions()

  const isFolder = node.type === NODE_TYPES.FOLDER
  const expanded = isFolder && isExpanded(node.id)
  const selected = isSelected(node.id)
  const editing = isEditing(node.id)
  const children = isFolder ? (node.children ?? []) : []

  const handleSelect = () => select(node.id)

  const handleToggle = (event) => {
    event.stopPropagation()
    toggleExpanded(node.id)
  }

  const handleRenameCommit = (name) => {
    explorer.renameNode(node.id, name)
    setEditing(null)
  }

  const handleRenameCancel = () => {
    setEditing(null)
  }

  return (
    <li role="none">
      <div
        role="treeitem"
        aria-expanded={isFolder ? expanded : undefined}
        aria-selected={selected}
        tabIndex={selected ? 0 : -1}
        style={{ paddingLeft: depth * INDENT_PX + 8 }}
        className={`group flex cursor-pointer items-center gap-1 py-0.5 pr-2 text-sm transition-colors ${
          selected ? 'bg-explorer-selected text-white' : 'text-explorer-text hover:bg-explorer-hover'
        }`}
        onClick={handleSelect}
        onDoubleClick={() => {
          if (isFolder) toggleExpanded(node.id)
        }}
      >
        {isFolder ? (
          <button
            type="button"
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${
              selected ? 'hover:bg-white/10' : 'hover:bg-explorer-border'
            }`}
            onClick={handleToggle}
            aria-label={expanded ? 'Collapse folder' : 'Expand folder'}
          >
            <Icon
              name={expanded ? 'chevronDown' : 'chevronRight'}
              className="h-3 w-3"
            />
          </button>
        ) : (
          <span className="inline-block h-5 w-5 shrink-0" aria-hidden />
        )}

        <Icon
          name={isFolder ? (expanded ? 'folderOpen' : 'folder') : 'file'}
          className={`h-4 w-4 shrink-0 ${selected ? 'text-white' : 'text-explorer-muted'}`}
        />

        {editing ? (
          <div className="min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
            <InlineRenameInput
              initialValue={node.name}
              onCommit={handleRenameCommit}
              onCancel={handleRenameCancel}
            />
          </div>
        ) : (
          <span className="min-w-0 flex-1 truncate">{node.name}</span>
        )}

        {!editing ? (
          <div
            className={`ml-auto flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 ${
              selected ? 'opacity-100' : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {isFolder ? (
              <>
                <Button
                  variant="ghost"
                  className={`!p-1 ${selected ? 'text-white hover:bg-white/10' : ''}`}
                  aria-label="Create file in folder"
                  title="New file"
                  onClick={() => onCreateFile(node.id)}
                >
                  <Icon name="file" className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  className={`!p-1 ${selected ? 'text-white hover:bg-white/10' : ''}`}
                  aria-label="Create folder in folder"
                  title="New folder"
                  onClick={() => onCreateFolder(node.id)}
                >
                  <Icon name="folder" className="h-3.5 w-3.5" />
                </Button>
              </>
            ) : null}
            <Button
              variant="ghost"
              className={`!p-1 ${selected ? 'text-white hover:bg-white/10' : ''}`}
              aria-label="Rename"
              title="Rename"
              onClick={() => setEditing(node.id)}
            >
              <Icon name="edit" className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              className={`!p-1 ${selected ? 'text-white hover:bg-white/10' : ''}`}
              aria-label="Delete"
              title="Delete"
              onClick={() =>
                onDelete({ id: node.id, name: node.name, nodeType: node.type })
              }
            >
              <Icon name="trash" className="h-3.5 w-3.5" />
            </Button>
          </div>
        ) : null}
      </div>

      {isFolder && expanded ? (
        <ExplorerTree nodes={children} depth={depth + 1} />
      ) : null}
    </li>
  )
}
