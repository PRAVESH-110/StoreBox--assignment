/**
 * VS Code–inspired shell: sidebar + main area.
 *
 * @param {{ sidebar: React.ReactNode, children: React.ReactNode }} props
 */
export function ExplorerLayout({ sidebar, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-explorer-bg text-explorer-text md:flex-row">
      <aside className="flex w-full shrink-0 flex-col border-explorer-border md:w-72 md:border-r">
        {sidebar}
      </aside>
      <main className="flex min-h-48 flex-1 flex-col">{children}</main>
    </div>
  )
}
