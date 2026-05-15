import { useReducer } from 'react'
import { ExplorerContext } from './ExplorerContext.jsx'
import { explorerReducer } from './explorerReducer.js'
import { explorerInitialState } from './explorerInitialState.js'

/**
 * @param {{ children: React.ReactNode }} props
 */
export function ExplorerProvider({ children }) {
  const [state, dispatch] = useReducer(explorerReducer, explorerInitialState)

  return (
    <ExplorerContext.Provider value={{ state, dispatch }}>
      {children}
    </ExplorerContext.Provider>
  )
}
