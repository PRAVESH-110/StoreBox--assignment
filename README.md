# VS Code–Style File Explorer (Take-Home)

React + TailwindCSS file explorer with nested folders, CRUD operations, and a minimal VS Code–inspired layout. Built without third-party tree libraries.

## Quick start

```bash
npm install
npm run dev
```

## Architecture overview

```
src/
├── components/
│   ├── common/       # Design-system primitives (Button, Icon)
│   ├── explorer/     # File-tree UI (layout, toolbar, tree, nodes)
│   ├── inputs/       # Controlled form controls (inline rename, text fields)
│   └── modals/       # Create / confirm dialogs
├── pages/            # Route-level composition (ExplorerPage)
├── hooks/            # Context consumers & UI-state helpers
├── services/         # Action orchestration (dispatch + payloads)
├── store/            # Context + reducer (global explorer state)
├── types/            # JSDoc typedefs (TreeNode, ExplorerState)
├── utils/            # Pure tree helpers + id generation
├── constants/        # Action types, node types, initial data
└── styles/           # Theme tokens (explorer color palette)
```

### Why each folder exists

| Folder | Responsibility |
|--------|----------------|
| `components/common` | Reusable, app-agnostic UI atoms. Explorer components depend on these, not the other way around. |
| `components/explorer` | Everything specific to the file tree: layout shell, toolbar, recursive tree, empty state. |
| `components/inputs` | Controlled inputs shared by inline rename and modals. Keeps form logic out of tree rows. |
| `components/modals` | Focus-trapped dialogs for create/delete when inline UX is not enough. |
| `pages` | Wires providers, layout, and top-level handlers. No deep tree logic here. |
| `hooks` | `useExplorer` / `useExplorerSelection` so components avoid prop-drilling through deep trees. |
| `services` | Builds action payloads (`createFile`, `renameNode`, …) and dispatches. UI calls `explorer.createFile()`, not raw `dispatch`. |
| `store` | Single source of truth: `useReducer` + `ExplorerContext`. Reducer delegates mutations to `utils/tree`. |
| `types` | Centralized JSDoc contracts for nodes and explorer state. |
| `utils` | **Pure, immutable** tree functions — no React, no side effects. |
| `constants` | Magic strings and initial tree in one place. |
| `styles` | Tailwind `@theme` tokens for the VS Code palette. |

## State management choice

**React Context + `useReducer`** (no Redux/Zustand for this scope).

| Concern | Where it lives |
|---------|----------------|
| Tree data (`tree[]`) | Reducer → `utils/tree` |
| UI state (selection, expansion, inline edit) | Reducer `ui` slice |
| Dispatching from UI | `services/explorerService` via `useExplorer()` |

**Why this fits**

- One cohesive feature domain (the explorer) — Context avoids prop-drilling through recursive `TreeNode`s.
- `useReducer` keeps transitions predictable and testable; action types live in `constants/explorerActions.js`.
- No extra dependencies; easy to swap the store layer later if the app grows.

**What we avoid**

- Putting mutation logic inside components.
- Storing derived state (e.g. duplicating the selected node object when `selectedId` is enough).

## Recursive rendering strategy

```
ExplorerPage
  └── ExplorerTree (root: maps state.tree)
        └── TreeNode (per node)
              ├── row UI (icon, label, chevron, actions)
              └── if folder && expanded → ExplorerTree(children, depth + 1)
```

- **`ExplorerTree`** — dumb list renderer; receives `nodes` and `depth`.
- **`TreeNode`** — knows one node; recurses for folder children.
- **Expansion** — `ui.expandedIds` (a `Set`) in the store; folders render children only when expanded.
- **Selection / rename** — `selectedId` and `editingId` in `ui`; `TreeNode` reads them via `useExplorerSelection()`.

No tree libraries: recursion is ~20 lines per component, full control over a11y (`role="tree"`, `role="treeitem"`).

## How utilities prevent component complexity

Components should **never** walk or clone the tree manually. All structural changes go through pure helpers:

| Utility | Purpose |
|---------|---------|
| `findNode(nodes, id)` | Locate node + parent + index (for validation, breadcrumbs) |
| `addNode(nodes, parentId, node)` | Immutable insert at root or under a folder |
| `editNode(nodes, id, updates)` | Immutable rename (and future metadata) |
| `deleteNode(nodes, id)` | Immutable remove (folder deletes subtree) |

**Flow:** `Button onClick` → `explorer.createFile()` → `dispatch(ADD_NODE)` → `reducer` → `addNode(state.tree, …)` → new state → React re-renders.

Components only call `explorer.*` and render `state.tree`. Complexity stays in `utils/tree` (unit-testable without React).

## Product decisions

| Topic | Decision |
|-------|----------|
| Create file/folder | **Name prompt modal** before adding to the tree |
| Undo | **Not implemented** |
| New folders | **Expanded by default** (also expands parent path) |
| Duplicate sibling names | **Allowed** — no uniqueness validation |

Captured in `src/constants/productDecisions.js`.

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| ↑ / ↓ | Previous / next visible item |
| ← | Collapse folder or jump to parent |
| → | Expand folder or move to first child |
| Home / End | First / last visible item |
| Enter / Space | Toggle folder expansion |
| F2 | Inline rename |
| Delete / Backspace | Delete (with confirmation) |

## Implementation roadmap

| Section | Status | Contents |
|---------|--------|----------|
| 1. Architecture + scaffold | ✅ | This README, folder structure, store/hooks/services shell |
| 2. Tree utilities | ✅ | `findNode`, `addNode`, `editNode`, `deleteNode` |
| 3. Reusable UI | ✅ | Inputs, modals, polish common components |
| 4. Recursive explorer | ✅ | `TreeNode`, `ExplorerTree`, row actions |
| 5. Page composition | ✅ | Create/edit/delete wired end-to-end |
| 6. UX polish | ✅ | Inline rename, expand/collapse, keyboard a11y |
| 7. Optional enhancements | 📋 | See below |

## Optional enhancements (not in core scope)

- Drag-and-drop reorder / move between folders
- Persist tree to `localStorage`
- Search / filter by name
- Context menu (right-click)
- Multi-select
- File content editor panel
- Undo/redo stack *(explicitly out of scope)*
- Duplicate node
- Import/export tree JSON

## Tech stack

- React 19 (functional components + hooks)
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- JavaScript with JSDoc types (no TypeScript)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint |
