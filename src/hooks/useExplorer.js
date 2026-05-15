import { useContext, useMemo } from 'react'
import { ExplorerContext } from '../store/ExplorerContext.jsx'
import { createExplorerService } from '../services/explorerService.js'

/**
 * @returns {{ state: import('../types/explorer.js').ExplorerState, explorer: ReturnType<typeof createExplorerService> }}
 */
export function useExplorer() {
  const context = useContext(ExplorerContext)

  if (!context) {
    throw new Error('useExplorer must be used within ExplorerProvider')
  }

  const explorer = useMemo(
    () => createExplorerService(context.dispatch),
    [context.dispatch],
  )

  return { state: context.state, explorer }
}
