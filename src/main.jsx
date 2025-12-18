/**
 * @file main.jsx
 * @description 애플리케이션의 진입점(Entry Point) 파일입니다.
 * React 라이브러리를 초기화하고, 필요한 전역 프로바이더를 설정하며
 * index.html의 'root' 엘리먼트에 App 컴포넌트를 렌더링합니다.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import "./index.css";

// ReactDOM.createRoot: React 18의 새로운 루트 API를 사용하여 렌더링을 시작합니다.
ReactDOM.createRoot(document.getElementById("root")).render(
  /**
   * React.StrictMode: 개발 모드에서 잠재적인 문제를 감지하기 위한 도구입니다.
   * HelmetProvider: SEO를 위한 head 태그 관리(react-helmet-async)를 위한 컨텍스트를 제공합니다.
   * BrowserRouter: Single Page Application(SPA)의 라우팅을 위해 HTML5 History API를 사용합니다.
   */
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
