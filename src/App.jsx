import { lazy, Suspense } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import TipTapTest from './components/TipTapTest'

// 동적 import로 필요한 컴포넌트만 로드
const CKEditorBasic = lazy(() => import('./components/CKEditorBasic'))
const CKEditorRich = lazy(() => import('./components/CKEditorRich'))

function App() {
  const location = useLocation()

  const getEditorTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Rich Editor Playground'
      case '/tiptap':
        return 'TipTap Editor'
      case '/ckeditor-basic':
        return 'CKEditor Basic'
      case '/ckeditor-rich':
        return 'CKEditor Rich'
      default:
        return 'Rich Editor Playground'
    }
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <div className="admin-layout">
      {/* Side Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Rich Editor</h1>
        </div>
        <nav className="sidebar-nav">
          <Link 
            to="/"
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          <Link 
            to="/tiptap"
            className={`nav-item ${isActive('/tiptap') ? 'active' : ''}`}
          >
            <span className="nav-icon">✏️</span>
            <span className="nav-text">TipTap</span>
          </Link>
          <Link 
            to="/ckeditor-basic"
            className={`nav-item ${isActive('/ckeditor-basic') ? 'active' : ''}`}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">CKEditor Basic</span>
          </Link>
          <Link 
            to="/ckeditor-rich"
            className={`nav-item ${isActive('/ckeditor-rich') ? 'active' : ''}`}
          >
            <span className="nav-icon">✨</span>
            <span className="nav-text">CKEditor Rich</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="content-header">
          <h2>{getEditorTitle()}</h2>
        </div>
        <div className="content-body">
          <Suspense fallback={<div style={{ padding: '20px', textAlign: 'center' }}>에디터를 로드하는 중...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tiptap" element={<TipTapTest />} />
              <Route path="/ckeditor-basic" element={<CKEditorBasic />} />
              <Route path="/ckeditor-rich" element={<CKEditorRich />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default App
