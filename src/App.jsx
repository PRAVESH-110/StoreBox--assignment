import { ExplorerProvider } from './store/ExplorerProvider.jsx'
import { ExplorerPage } from './pages/ExplorerPage.jsx'

function App() {
  return (
    <ExplorerProvider>
      <ExplorerPage />
    </ExplorerProvider>
  )
}

export default App
