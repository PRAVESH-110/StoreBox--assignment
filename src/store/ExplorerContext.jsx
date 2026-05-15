import { createContext } from 'react'

/**
 * @typedef {Object} ExplorerContextValue
 * @property {import('../types/explorer.js').ExplorerState} state
 * @property {React.Dispatch<{ type: string, payload?: unknown }>} dispatch
 */

/** @type {React.Context<ExplorerContextValue | null>} */
export const ExplorerContext = createContext(null)
