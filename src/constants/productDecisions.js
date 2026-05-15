/**
 * Product decisions agreed for this take-home.
 * Referenced by modals, reducer, and services.
 */
export const PRODUCT_DECISIONS = {
  /** Create file/folder via name prompt modal before adding to tree */
  PROMPT_NAME_ON_CREATE: true,
  /** No undo/redo stack */
  UNDO_ENABLED: false,
  /** New folders start expanded in the tree */
  EXPAND_NEW_FOLDERS: true,
  /** Sibling duplicate names are allowed */
  ENFORCE_UNIQUE_SIBLING_NAMES: false,
}
