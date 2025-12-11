# Web Editor Test (TipTap Custom)

TipTap을 기반으로 한 커스텀 리치 텍스트 에디터 프로젝트입니다. 다양한 텍스트 편집 기능과 테이블, 이미지, 링크 등의 고급 기능을 제공하는 웹 기반 에디터입니다.

## 주요 기능

### 텍스트 서식
- **기본 서식**: 굵게, 기울임, 밑줄, 취소선, 인라인 코드
- **제목**: H1, H2, H3
- **목록**: 순서 있는 목록, 순서 없는 목록, 체크리스트 (Task List)
- **정렬**: 왼쪽, 가운데, 오른쪽, 양쪽 정렬
- **폰트**: 
  - 폰트 패밀리 선택 (기본, Noto Sans KR, Pretendard, Arial, Helvetica, Times New Roman, Courier New, Georgia, Verdana, Comic Sans MS, Impact, Trebuchet MS)
  - 텍스트 색상 및 하이라이트 색상
- **기타**: 위첨자, 아래첨자, 하이라이트, 인용구, 코드 블록, 수평선

### 고급 기능
- **테이블**: 
  - 테이블 생성 (행/열 개수 지정, 헤더 행 옵션)
  - 행/열 추가/삭제 (앞/뒤 추가 지원)
  - 셀 병합/분할 (드래그로 여러 셀 선택 후 병합)
  - 셀 배경색 설정 및 제거
  - 헤더 행/열 토글
  - 테이블 삭제
  - 리사이즈 가능한 테이블
- **이미지**: 이미지 삽입 (URL 또는 Base64)
- **링크**: 링크 삽입 및 제거
- **소스 모드**: HTML 소스 코드 직접 편집 (적용/취소 기능)
- **실시간 통계**: 글자 수 및 단어 수 실시간 표시
- **실행 취소/다시 실행**: Undo/Redo 기능

## 기술 스택

- **React 18.3.1**: UI 프레임워크
- **TipTap 3.13.0**: 리치 텍스트 에디터 코어 및 확장
- **Vite 5.4.2**: 빌드 도구 및 개발 서버
- **Lucide React 0.559.0**: 아이콘 라이브러리
- **ESLint**: 코드 품질 관리

### 사용된 TipTap 확장

이 프로젝트는 다음 TipTap 확장들을 사용합니다:

- `@tiptap/starter-kit`: 기본 확장 모음 (Bold, Italic, Strike, Code, Heading, List, Blockquote, CodeBlock, HorizontalRule, History 등)
- `@tiptap/extension-table` 및 관련 확장: 테이블 기능 (Table, TableRow, TableHeader, TableCell)
- `@tiptap/extension-image`: 이미지 삽입
- `@tiptap/extension-link`: 링크 기능
- `@tiptap/extension-font-family`: 폰트 패밀리
- `@tiptap/extension-text-align`: 텍스트 정렬
- `@tiptap/extension-highlight`: 하이라이트 (다중 색상 지원)
- `@tiptap/extension-underline`: 밑줄
- `@tiptap/extension-subscript`: 아래첨자
- `@tiptap/extension-superscript`: 위첨자
- `@tiptap/extension-character-count`: 글자 수 카운트
- `@tiptap/extension-color`: 텍스트 색상
- `@tiptap/extension-text-style`: 텍스트 스타일
- `@tiptap/extension-placeholder`: 플레이스홀더
- `@tiptap/extension-focus`: 포커스 상태 관리
- `@tiptap/extension-task-list` & `@tiptap/extension-task-item`: 체크리스트
- `@tiptap/extension-typography`: 타이포그래피 개선

## 설치 방법

### 필수 요구사항
- Node.js 16.x 이상
- npm 또는 yarn

### 설치 단계

1. 저장소 클론 또는 다운로드
```bash
git clone <repository-url>
cd web-editor-test
```

2. 의존성 설치
```bash
npm install
```

## 실행 방법

### 개발 서버 실행
```bash
npm run dev
```

개발 서버가 실행되면 브라우저에서 `http://localhost:5173`으로 접속할 수 있습니다.

### 프로덕션 빌드
```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

### 빌드 미리보기
```bash
npm run preview
```

## 프로젝트 구조

```
web-editor-test/
├── src/
│   ├── components/
│   │   └── TipTapTest.jsx    # 메인 에디터 컴포넌트 (툴바, 에디터, 소스 모드 등)
│   ├── App.jsx                # 메인 앱 컴포넌트 (레이아웃, 사이드바)
│   ├── App.css                # 애플리케이션 스타일시트 (레이아웃, 에디터 스타일)
│   ├── index.css              # 전역 스타일
│   └── main.jsx               # React 진입점
├── public/                    # 정적 파일
├── index.html                 # HTML 템플릿 (Noto Sans KR, Pretendard 폰트 포함)
├── vite.config.js             # Vite 설정
├── package.json               # 프로젝트 설정 및 의존성
└── README.md                  # 프로젝트 문서
```

### 주요 컴포넌트 설명

- **App.jsx**: 관리자 레이아웃을 제공하며, 사이드바와 메인 콘텐츠 영역으로 구성됩니다.
- **TipTapTest.jsx**: 
  - TipTap 에디터 인스턴스 생성 및 관리
  - 포괄적인 툴바 UI (텍스트 서식, 테이블, 이미지, 링크 등)
  - 소스 모드 (HTML 직접 편집)
  - 실시간 글자/단어 수 표시
  - 에디터 데이터 출력 영역

## 사용 방법

### 기본 사용

에디터는 자동으로 초기화되며, 툴바의 버튼을 클릭하여 다양한 서식을 적용할 수 있습니다. 플레이스홀더로 "내용을 입력하세요..."가 표시됩니다.

### 텍스트 서식 적용

1. **기본 서식**: 텍스트를 선택한 후 굵게, 기울임, 밑줄, 취소선, 인라인 코드 버튼 클릭
2. **제목**: 텍스트를 선택한 후 H1, H2, H3 버튼 클릭
3. **폰트 변경**: 드롭다운에서 원하는 폰트 선택 (한글 폰트: Noto Sans KR, Pretendard 지원)
4. **색상 변경**: 색상 선택기를 사용하여 텍스트 색상 또는 하이라이트 색상 설정
5. **정렬**: 텍스트 블록을 선택한 후 정렬 버튼 클릭

### 테이블 작업

1. **테이블 삽입**: 
   - 테이블 아이콘 클릭
   - 행 개수와 열 개수 입력 (기본값: 3x3)
   - 헤더 행 포함 여부 선택

2. **행/열 관리**: 
   - 테이블 내부에 커서를 두면 테이블 관련 버튼이 표시됩니다
   - 행/열 추가: 앞/뒤에 추가 가능
   - 행/열 삭제: 현재 행/열 삭제

3. **셀 병합**: 
   - 마우스로 드래그하여 2개 이상의 인접한 셀 선택
   - 병합 버튼 클릭
   - ⚠️ 직사각형 영역의 인접한 셀들만 병합 가능

4. **셀 분할**: 
   - 병합된 셀에 커서를 두고 분할 버튼 클릭
   - ⚠️ 병합된 셀만 분할 가능

5. **셀 배경색**: 
   - 셀에 커서를 두고 색상 선택기 또는 팔레트 버튼으로 배경색 설정
   - 배경색 제거 버튼으로 초기화

6. **헤더 토글**: 헤더 행/열을 일반 행/열로 전환하거나 그 반대로 변경

### 이미지 삽입

1. 이미지 아이콘 클릭
2. 이미지 URL 입력 (또는 Base64 인코딩된 이미지)
3. 이미지가 에디터에 삽입됩니다

### 링크 작업

1. **링크 삽입**: 텍스트를 선택한 후 링크 아이콘 클릭 → URL 입력
2. **링크 제거**: 링크가 적용된 텍스트를 선택한 후 링크 제거 버튼 클릭

### 소스 모드

1. HTML 소스 코드 아이콘 클릭하여 소스 모드로 전환
2. HTML 코드를 직접 편집
3. "적용" 버튼으로 변경사항 반영 또는 "취소" 버튼으로 되돌리기

### 데이터 확인

에디터 하단의 "출력 데이터" 섹션에서 현재 에디터의 HTML 내용을 실시간으로 확인할 수 있습니다. 이 데이터를 서버로 전송하거나 저장할 수 있습니다.

## 특징

### 한국어 지원
- **한글 폰트**: Noto Sans KR, Pretendard 폰트 지원
- **한글 최적화**: 한글 텍스트 입력 및 편집에 최적화된 UI/UX

### 사용자 경험
- **직관적인 툴바**: 기능별로 그룹화된 툴바로 쉽게 접근
- **실시간 피드백**: 활성화된 서식은 버튼이 하이라이트되어 표시
- **컨텍스트 메뉴**: 테이블 내부에 있을 때만 테이블 관련 버튼 표시
- **에러 처리**: 셀 병합/분할 시 명확한 안내 메시지 제공

### 커스터마이징
- **확장 가능한 구조**: 새로운 TipTap 확장을 쉽게 추가 가능
- **스타일 커스터마이징**: CSS를 통해 에디터 스타일 완전 제어
- **테이블 셀 속성 확장**: 커스텀 backgroundColor 속성으로 셀 배경색 지원

## 커스터마이징

### 스타일 수정

`src/App.css` 파일에서 다음을 수정할 수 있습니다:
- 레이아웃 스타일 (사이드바, 메인 콘텐츠 영역)
- 에디터 스타일 (툴바, 에디터 영역, 소스 모드)
- 테이블 스타일
- 폰트 및 색상

### 기능 추가/제거

`src/components/TipTapTest.jsx` 파일의 `extensions` 배열에서 확장을 추가하거나 제거할 수 있습니다:

```javascript
const editor = useEditor({
  extensions: [
    // 여기에 확장 추가/제거
  ],
})
```

### 툴바 커스터마이징

`TipTapTest.jsx` 파일의 `tiptap-menu-bar` 섹션을 수정하여:
- 버튼 추가/제거
- 버튼 순서 변경
- 새로운 메뉴 그룹 생성

### 폰트 추가

`TipTapTest.jsx`의 `fontFamilies` 배열에 새로운 폰트를 추가하고, `index.html`에 폰트 링크를 추가하면 됩니다.

## 개발 스크립트

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 검사
npm run lint
```

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 알려진 제한사항

- 이미지 업로드는 URL 또는 Base64만 지원 (로컬 파일 업로드 미지원)
- 테이블 셀 병합은 직사각형 영역의 인접한 셀만 가능
- 소스 모드에서 HTML 유효성 검사는 수행하지 않음

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요. Pull Request도 환영합니다.

## 참고 자료

- [TipTap 공식 문서](https://tiptap.dev/)
- [TipTap GitHub](https://github.com/ueberdosis/tiptap)
- [TipTap 확장 목록](https://tiptap.dev/docs/editor/extensions)
- [React 공식 문서](https://react.dev/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Lucide Icons](https://lucide.dev/)
