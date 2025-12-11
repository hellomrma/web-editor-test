import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-badge">Rich Editor Playground</div>
        <h1>웹 에디터 테스트 플랫폼</h1>
        <p className="home-subtitle">다양한 리치 텍스트 에디터를 비교하고 테스트해보세요</p>
      </div>

      <div className="editor-cards">
        <Link to="/tiptap" className="editor-card editor-card-tiptap">
          <div className="card-icon-wrapper">
            <div className="card-icon">✏️</div>
          </div>
          <div className="card-badge card-badge-free">Free</div>
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

        <Link to="/ckeditor-basic" className="editor-card editor-card-basic">
          <div className="card-icon-wrapper">
            <div className="card-icon">📝</div>
          </div>
          <div className="card-badge card-badge-free">Free (GPL)</div>
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

        <Link to="/ckeditor-rich" className="editor-card editor-card-rich">
          <div className="card-icon-wrapper">
            <div className="card-icon">✨</div>
          </div>
          <div className="card-badge card-badge-premium">Premium</div>
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
      </div>

      <div className="home-footer">
        <div className="footer-content">
          <p className="footer-text">각 에디터를 클릭하여 테스트해보세요</p>
          <div className="footer-info">
            <span>💡 Tip: 사이드바에서도 빠르게 이동할 수 있습니다</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

