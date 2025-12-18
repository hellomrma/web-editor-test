/**
 * @file App.jsx
 * @description 애플리케이션의 메인 레이아웃 및 라우팅 설정을 담당하는 컴포넌트입니다.
 * 사이드바 네비게이션과 메인 컨텐츠 영역으로 구성되어 있습니다.
 */

import { lazy, Suspense } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import TipTapTest from "./components/TipTapTest";

/**
 * lazy & Suspense: 초기 로딩 속도 최적화를 위해 컴포넌트를 동적으로 임포트합니다.
 * 해당 경로에 접속했을 때만 컴포넌트 파일을 다운로드합니다.
 */
const CKEditorBasic = lazy(() => import("./components/CKEditorBasic"));
const CKEditorRich = lazy(() => import("./components/CKEditorRich"));

function App() {
  // useLocation: 현재 브라우저의 URL 경로 정보를 가져옵니다.
  const location = useLocation();

  /**
   * getEditorTitle: 현재 경로(pathname)에 따라 헤더에 표시할 제목을 반환합니다.
   */
  const getEditorTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Rich Editor Playground";
      case "/tiptap":
        return "TipTap Editor";
      case "/ckeditor-basic":
        return "CKEditor Basic";
      case "/ckeditor-rich":
        return "CKEditor Rich";
      default:
        return "Rich Editor Playground";
    }
  };

  /**
   * isActive: 파라미터로 전달된 path가 현재 경로와 일치하는지 확인하여 활성화 상태를 반환합니다.
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="admin-layout">
      {/* 
        Side Navigation: 
        애플리케이션의 주요 메뉴를 표시하는 사이드바입니다.
      */}
      <aside className="sidebar" aria-label="주요 네비게이션">
        <div className="sidebar-header">
          <h1>Rich Editor</h1>
        </div>
        <nav className="sidebar-nav" aria-label="에디터 메뉴">
          <Link to="/" className={`nav-item ${isActive("/") ? "active" : ""}`}>
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          <Link
            to="/tiptap"
            className={`nav-item ${isActive("/tiptap") ? "active" : ""}`}
          >
            <span className="nav-icon">✏️</span>
            <span className="nav-text">TipTap</span>
          </Link>
          <Link
            to="/ckeditor-basic"
            className={`nav-item ${
              isActive("/ckeditor-basic") ? "active" : ""
            }`}
          >
            <span className="nav-icon">📝</span>
            <span className="nav-text">CKEditor Basic</span>
          </Link>
          <Link
            to="/ckeditor-rich"
            className={`nav-item ${isActive("/ckeditor-rich") ? "active" : ""}`}
          >
            <span className="nav-icon">✨</span>
            <span className="nav-text">CKEditor Rich</span>
          </Link>
        </nav>
      </aside>

      {/* 
        Main Content Area: 
        라우팅에 따라 실제 에디터 컴포넌트가 렌더링되는 영역입니다.
      */}
      <main className="main-content" role="main">
        <header className="content-header">
          <h2>{getEditorTitle()}</h2>
        </header>
        <div className="content-body" role="region" aria-label="에디터 콘텐츠">
          {/* Suspense: lazy로 로딩되는 컴포넌트가 준비될 동안 보여줄 UI(fallback)를 정의합니다. */}
          <Suspense
            fallback={
              <div style={{ padding: "20px", textAlign: "center" }}>
                에디터를 로드하는 중...
              </div>
            }
          >
            <Routes>
              {/* Route: 특정 경로와 컴포넌트를 매핑합니다. */}
              <Route path="/" element={<Home />} />
              <Route path="/tiptap" element={<TipTapTest />} />
              <Route path="/ckeditor-basic" element={<CKEditorBasic />} />
              <Route path="/ckeditor-rich" element={<CKEditorRich />} />
            </Routes>
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default App;
