import { Button } from '../common/Button.jsx'
import { Icon } from '../common/Icon.jsx'

/**
 * @param {{ onCreateFile: () => void, onCreateFolder: () => void }} props
 */
export function ExplorerEmptyState({ onCreateFile, onCreateFolder }) {
  return (
    <div
      className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-12 text-center"
      role="region"
      aria-label="Empty workspace"
    >
      <p className="max-w-xs text-sm text-explorer-muted">
        No files or folders yet. Create your first item to get started.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button variant="primary" onClick={onCreateFile}>
          <Icon name="plus" className="h-3.5 w-3.5" />
          Create File
        </Button>
        <Button variant="primary" onClick={onCreateFolder}>
          <Icon name="plus" className="h-3.5 w-3.5" />
          Create Folder
        </Button>
      </div>
    </div>
  )
}
