import { createContext, useContext } from 'react'

/**
 * @typedef {Object} ExplorerActionsValue
 * @property {(parentId: string | null) => void} onCreateFile
 * @property {(parentId: string | null) => void} onCreateFolder
 * @property {(target: { id: string, name: string, nodeType: 'file' | 'folder' }) => void} onDelete
 */

/** @type {React.Context<ExplorerActionsValue | null>} */
export const ExplorerActionsContext = createContext(null)

/**
 * @param {{ value: ExplorerActionsValue, children: React.ReactNode }} props
 */
export function ExplorerActionsProvider({ value, children }) {
  return (
    <ExplorerActionsContext.Provider value={value}>{children}</ExplorerActionsContext.Provider>
  )
}

/** @returns {ExplorerActionsValue} */
export function useExplorerActions() {
  const context = useContext(ExplorerActionsContext)
  if (!context) {
    throw new Error('useExplorerActions must be used within ExplorerActionsProvider')
  }
  return context
}
