import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/**
 * @file vite.config.js
 * @description Vite 빌드 및 개발 서버 설정을 담당하는 파일입니다.
 */
export default defineConfig({
  // React 플러그인 설정 (HMR, JSX 지원 등)
  plugins: [react()],

  // 의존성 최적화 설정
  optimizeDeps: {
    // CKEditor와 같이 런타임에 로드되거나 복잡한 라이브러리는 미리 빌드(Pre-bundling)하도록 지정합니다.
    include: ["@ckeditor/ckeditor5-react"],
  },
});
