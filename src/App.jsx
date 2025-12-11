import './App.css'
import TipTapTest from './components/TipTapTest'

function App() {
  return (
    <div className="admin-layout">
      {/* Side Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Web Editor</h1>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <span className="nav-icon">✏️</span>
            <span className="nav-text">TipTap</span>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-header">
          <h2>TipTap</h2>
        </div>
        <div className="content-body">
          <TipTapTest />
        </div>
      </main>
    </div>
  )
}

export default App

