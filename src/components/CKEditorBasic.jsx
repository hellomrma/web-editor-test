/**
 * @file CKEditorBasic.jsx
 * @description CKEditor 5의 기본(Basic) 빌드를 테스트하는 컴포넌트입니다.
 * GPL 라이선스 하에 무료로 사용할 수 있는 플러그인들로 구성되어 있습니다.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import SEO from "./SEO";

function CKEditorBasic() {
  // editorData: 에디터에 담긴 HTML 콘텐츠를 상태로 관리합니다.
  const [editorData, setEditorData] = useState(
    "<p>CKEditor 5 Basic 버전 테스트를 시작하세요!</p>"
  );
  const editorInstance = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  /**
   * useCKEditorCloud: CKEditor 5 CDN을 통해 라이브러리를 동적으로 로드합니다.
   * premium: false로 설정하여 무료 플러그인만 로드하도록 합니다.
   */
  const cloud = useCKEditorCloud({
    version: "47.3.0",
    premium: false,
    translations: ["ko"],
  });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => {
      setIsLayoutReady(false);
      // 컴포넌트 언마운트 시 에디터 인스턴스를 메모리에서 해제합니다.
      if (editorInstance.current) {
        try {
          editorInstance.current.destroy();
        } catch (error) {
          console.warn("Error destroying editor:", error);
        }
        editorInstance.current = null;
      }
    };
  }, []);

  /**
   * useMemo: 에디터 클래스(ClassicEditor)와 설정(editorConfig)을 메모이제이션하여
   * 불필요한 재렌더링 및 재초기화를 방지합니다.
   */
  const { ClassicEditor, editorConfig } = useMemo(() => {
    // 라이브러리가 로드되지 않았거나 레이아웃이 준비되지 않았다면 빈 객체 반환
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    // cloud.CKEditor에서 필요한 모든 플러그인과 에디터 생성자를 가져옵니다.
    const {
      ClassicEditor,
      Essentials,
      Paragraph,
      Autoformat,
      TextTransformation,
      Link,
      ImageBlock,
      ImageToolbar,
      BlockQuote,
      Bold,
      CloudServices,
      ImageUpload,
      ImageInsertViaUrl,
      AutoImage,
      Table,
      TableToolbar,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Heading,
      HorizontalLine,
      ImageTextAlternative,
      ImageCaption,
      ImageStyle,
      Indent,
      IndentBlock,
      Code,
      ImageInline,
      Italic,
      AutoLink,
      List,
      ImageUtils,
      ImageEditing,
      Strikethrough,
      Subscript,
      Superscript,
      TableCaption,
      Alignment,
      TodoList,
      Underline,
      BalloonToolbar,
      BlockToolbar,
      SourceEditing,
    } = cloud.CKEditor;

    return {
      ClassicEditor,
      editorConfig: {
        // toolbar: 상단 툴바에 배치할 도구들을 배열로 정의합니다.
        toolbar: {
          items: [
            "undo",
            "redo",
            "|", // 실행취소, 다시실행
            "heading",
            "|", // 제목 스타일
            "fontSize",
            "fontFamily", // 글자 크기 및 서체
            "fontColor",
            "fontBackgroundColor",
            "|", // 글자 색상 및 배경색
            "bold",
            "italic",
            "underline",
            "strikethrough", // 볼드, 이탤릭, 밑줄, 취소선
            "subscript",
            "superscript",
            "code",
            "|", // 아래첨자, 위첨자, 코드
            "alignment",
            "|", // 정렬
            "numberedList",
            "bulletedList",
            "todoList",
            "|", // 리스트 타입
            "outdent",
            "indent",
            "|", // 내어쓰기, 들여쓰기
            "blockQuote",
            "insertTable",
            "link",
            "mediaEmbed",
            "|", // 인용, 표, 링크, 미디어
            "horizontalLine",
            "|", // 가로선
            "codeBlock",
            "|", // 코드 블록
            "sourceEditing", // 소스 편집 모드 (HTML 직접 수정)
          ],
          shouldNotGroupWhenFull: true, // 툴바가 가득 찼을 때 그룹화하지 않고 줄바꿈 허용
        },
        // plugins: 에디터에서 사용할 플러그인들을 등록합니다.
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          BalloonToolbar,
          BlockQuote,
          BlockToolbar,
          Bold,
          CloudServices,
          Code,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Heading,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsertViaUrl,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          Indent,
          IndentBlock,
          Italic,
          Link,
          List,
          Paragraph,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          SourceEditing,
        ],
        // balloonToolbar: 텍스트를 드래그했을 때 나타나는 팝업 툴바 설정
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
        // heading: 제목 스타일의 옵션과 클래스를 정의
        heading: {
          options: [
            {
              model: "paragraph",
              title: "본문",
              class: "ck-heading_paragraph",
            },
            {
              model: "heading1",
              view: "h1",
              title: "제목 1",
              class: "ck-heading_heading1",
            },
            {
              model: "heading2",
              view: "h2",
              title: "제목 2",
              class: "ck-heading_heading2",
            },
            {
              model: "heading3",
              view: "h3",
              title: "제목 3",
              class: "ck-heading_heading3",
            },
          ],
        },
        fontSize: {
          options: [9, 11, 13, "default", 17, 19, 21, 27, 35],
        },
        fontFamily: {
          options: [
            "default",
            "Arial, Helvetica, sans-serif",
            "Courier New, Courier, monospace",
            "Georgia, serif",
            "Lucida Sans Unicode, Lucida Grande, sans-serif",
            "Tahoma, Geneva, sans-serif",
            "Times New Roman, Times, serif",
            "Trebuchet MS, Helvetica, sans-serif",
            "Verdana, Geneva, sans-serif",
            "Noto Sans KR, sans-serif",
            "Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
          ],
        },
        table: {
          contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
        image: {
          toolbar: [
            "imageStyle:inline",
            "imageStyle:block",
            "imageStyle:side",
            "|",
            "toggleImageCaption",
            "imageTextAlternative",
          ],
        },
        language: "ko", // 한국어 번역 적용
        // licenseKey: Basic 버전은 무료이므로 'GPL'을 기본값으로 사용합니다.
        licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY_BASIC || "GPL",
      },
    };
  }, [cloud, isLayoutReady]);

  // onReady: 에디터 초기화가 완료되었을 때 호출되는 콜백
  const handleReady = (editor) => {
    editorInstance.current = editor;
    console.log("CKEditor 5 Basic is ready to use!", editor);
  };

  // onChange: 에디터의 데이터가 변경될 때마다 호출되어 상태를 업데이트합니다.
  const handleChange = (event, editor) => {
    const newData = editor.getData();
    setEditorData(newData);
  };

  // 로딩 상태 처리
  if (
    cloud.status !== "success" ||
    !isLayoutReady ||
    !ClassicEditor ||
    !editorConfig
  ) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>CKEditor를 로드하는 중...</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="CKEditor Basic"
        description="CKEditor 5 Basic은 GPL 라이선스로 무료로 사용할 수 있는 기본 빌드 버전입니다."
        keywords="CKEditor, CKEditor 5, CKEditor Basic, GPL 에디터, 무료 에디터"
        canonical="https://rich-editor-playground.com/ckeditor-basic"
      />
      <div className="editor-container">
        <div className="ckeditor-wrapper">
          <div
            className="ckeditor5-container"
            role="textbox"
            aria-label="CKEditor Basic 에디터"
          >
            {/* React 컴포넌트로 구현된 CKEditor */}
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              config={editorConfig}
              onReady={handleReady}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* 푸터: 글자 수 세기 기능 */}
        <div className="editor-footer">
          <div className="editor-footer-content">
            <div className="character-count">
              {/* regex를 사용하여 HTML 태그를 제외한 텍스트의 길이를 측정합니다. */}
              <span className="count-number">
                {editorData.replace(/<[^>]*>/g, "").length}
              </span>
              <span className="count-label">글자</span>
            </div>
          </div>
        </div>

        {/* 출력 영역: 에디터에 입력된 실제 HTML 소스를 보여줍니다. */}
        <div className="editor-output">
          <div className="output-header">
            <h3>출력 데이터</h3>
            <span className="output-badge">HTML</span>
          </div>
          <pre className="output-content">{editorData}</pre>
        </div>
      </div>
    </>
  );
}

export default CKEditorBasic;
