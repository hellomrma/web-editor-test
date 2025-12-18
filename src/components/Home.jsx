/**
 * @file Home.jsx
 * @description 애플리케이션의 메인 대시보드 화면입니다.
 * 각 에디터(TipTap, CKEditor)의 특징을 요약하여 보여주고 해당 테스트 페이지로 연결합니다.
 */

import { Link } from "react-router-dom";
import SEO from "./SEO";
import "./Home.css";

function Home() {
  return (
    <>
      {/* 
        SEO 컴포넌트: 
        각 페이지별로 메타 태그(제목, 설명, 키워드 등)를 동적으로 변경합니다. 
      */}
      <SEO
        title="웹 에디터 테스트 플랫폼"
        description="TipTap, CKEditor Basic, CKEditor Rich 등 다양한 리치 텍스트 에디터를 한 곳에서 비교하고 테스트할 수 있는 플랫폼입니다. 실시간으로 에디터 기능을 체험하고 비교해보세요."
        keywords="리치 텍스트 에디터, TipTap, CKEditor, 웹 에디터, 텍스트 에디터, WYSIWYG, 에디터 비교, 에디터 테스트, 오픈소스 에디터, React 에디터, 에디터 데모"
        canonical="https://rich-editor-playground.com/"
      />
      <div className="home-container">
        <header className="home-header">
          <div className="home-badge" aria-label="플랫폼 이름">
            Rich Editor Playground
          </div>
          <h1>웹 에디터 테스트 플랫폼</h1>
          <p className="home-subtitle">
            다양한 리치 텍스트 에디터를 비교하고 테스트해보세요
          </p>
        </header>

        {/* 에디터 선택 섹션: 각 에디터의 주요 특징을 카드로 표현 */}
        <section className="editor-cards" aria-label="에디터 선택">
          <article>
            {/* TipTap 카드 */}
            <Link
              to="/tiptap"
              className="editor-card editor-card-tiptap"
              aria-label="TipTap 에디터로 이동"
            >
              <div className="card-icon-wrapper" aria-hidden="true">
                <div className="card-icon">✏️</div>
              </div>
              <div
                className="card-badge card-badge-free"
                aria-label="무료 버전"
              >
                Free
              </div>
              <h2>TipTap</h2>
              <p>모던하고 확장 가능한 오픈소스 에디터</p>
              <ul className="card-features">
                <li>테이블 편집</li>
                <li>이미지 삽입</li>
                <li>다양한 서식 옵션</li>
                <li>소스 모드</li>
              </ul>
              <div className="card-footer">
                <span className="card-link">시작하기 →</span>
              </div>
            </Link>
          </article>

          <article>
            {/* CKEditor Basic 카드 */}
            <Link
              to="/ckeditor-basic"
              className="editor-card editor-card-basic"
              aria-label="CKEditor Basic 에디터로 이동"
            >
              <div className="card-icon-wrapper" aria-hidden="true">
                <div className="card-icon">📝</div>
              </div>
              <div
                className="card-badge card-badge-free"
                aria-label="무료 GPL 버전"
              >
                Free (GPL)
              </div>
              <h2>CKEditor Basic</h2>
              <p>CKEditor 5 기본 빌드 버전</p>
              <ul className="card-features">
                <li>기본 편집 기능</li>
                <li>테이블 지원</li>
                <li>이미지 업로드</li>
                <li>한국어 지원</li>
              </ul>
              <div className="card-footer">
                <span className="card-link">시작하기 →</span>
              </div>
            </Link>
          </article>

          <article>
            {/* CKEditor Rich 카드 (프리미엄 기능 포함) */}
            <Link
              to="/ckeditor-rich"
              className="editor-card editor-card-rich"
              aria-label="CKEditor Rich 에디터로 이동"
            >
              <div className="card-icon-wrapper" aria-hidden="true">
                <div className="card-icon">✨</div>
              </div>
              <div
                className="card-badge card-badge-premium"
                aria-label="프리미엄 버전"
              >
                Premium
              </div>
              <h2>CKEditor Rich</h2>
              <p>CKEditor 5 프리미엄 기능 포함 버전</p>
              <ul className="card-features">
                <li>Word Import/Export</li>
                <li>PDF Export</li>
                <li>Format Painter</li>
                <li>Footnotes & Templates</li>
              </ul>
              <div className="card-footer">
                <span className="card-link">시작하기 →</span>
              </div>
            </Link>
          </article>
        </section>

        <footer className="home-footer">
          <div className="footer-content">
            <p className="footer-text">각 에디터를 클릭하여 테스트해보세요</p>
            <div className="footer-info">
              <span>💡 Tip: 사이드바에서도 빠르게 이동할 수 있습니다</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;
