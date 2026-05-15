import { Button } from '../common/Button.jsx'
import { Icon } from '../common/Icon.jsx'

/**
 * @param {{ onCreateFile: () => void, onCreateFolder: () => void }} props
 */
export function ExplorerToolbar({ onCreateFile, onCreateFolder }) {
  return (
    <header className="flex items-center justify-between border-b border-explorer-border bg-explorer-sidebar px-3 py-2">
      <h1 className="text-xs font-semibold uppercase tracking-wide text-explorer-muted">
        Explorer
      </h1>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          onClick={onCreateFile}
          aria-label="Create file"
          title="Create file"
        >
          <Icon name="file" className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          onClick={onCreateFolder}
          aria-label="Create folder"
          title="Create folder"
        >
          <Icon name="folder" className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
