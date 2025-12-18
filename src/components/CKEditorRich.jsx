/**
 * @file CKEditorRich.jsx
 * @description 프리미엄 기능이 포함된 CKEditor 5의 고급(Rich) 빌드를 테스트하는 컴포넌트입니다.
 * Word/PDF 내보내기, 서식 복사, 템플릿 등 강력한 기업용 기능을 포함하고 있습니다.
 */

import { useState, useEffect, useRef, useMemo } from "react";
import { CKEditor, useCKEditorCloud } from "@ckeditor/ckeditor5-react";
import SEO from "./SEO";

/**
 * LICENSE_KEY_RICH: 프리미엄 기능을 활성화하기 위한 라이선스 키입니다.
 * 환경 변수(.env)에서 관리하는 것을 권장합니다.
 */
const LICENSE_KEY_RICH = import.meta.env.VITE_CKEDITOR_LICENSE_KEY_RICH || "";

function CKEditorRich() {
  const [editorData, setEditorData] = useState(
    "<p>CKEditor 5 Rich 버전 테스트를 시작하세요!</p>"
  );
  const editorInstance = useRef(null);
  const editorContainerRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  /**
   * useCKEditorCloud: premium: true로 설정하여 프리미엄 플러그인 라이브러리를 함께 로드합니다.
   */
  const cloud = useCKEditorCloud({
    version: "47.3.0",
    premium: true,
    translations: ["ko"],
  });

  useEffect(() => {
    setIsLayoutReady(true);
    return () => {
      setIsLayoutReady(false);
      if (editorInstance.current) {
        try {
          editorInstance.current.destroy();
        } catch (error) {
          console.warn("Error destroying Rich editor:", error);
        }
        editorInstance.current = null;
      }
    };
  }, []);

  /**
   * useMemo: 에디터 설정 및 플러그인 구성을 정의합니다.
   * Basic 버전보다 훨씬 많은 플러그인과 복잡한 설정을 포함하고 있습니다.
   */
  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== "success" || !isLayoutReady) {
      return {};
    }

    // 기본 플러그인과 에디터 생성자 (cloud.CKEditor)
    const {
      ClassicEditor,
      Autosave,
      Essentials,
      Paragraph,
      Autoformat,
      TextTransformation,
      LinkImage,
      Link,
      ImageBlock,
      ImageToolbar,
      BlockQuote,
      Bold,
      Bookmark,
      CloudServices,
      ImageUpload,
      ImageInsertViaUrl,
      AutoImage,
      TableColumnResize,
      Table,
      TableToolbar,
      PasteFromOffice,
      FindAndReplace,
      FontBackgroundColor,
      FontColor,
      FontFamily,
      FontSize,
      Fullscreen,
      Heading,
      Highlight,
      HorizontalLine,
      ImageTextAlternative,
      ImageCaption,
      ImageResize,
      ImageStyle,
      Indent,
      IndentBlock,
      Code,
      ImageInline,
      Italic,
      AutoLink,
      ListProperties,
      List,
      ImageUtils,
      ImageEditing,
      PageBreak,
      RemoveFormat,
      SpecialCharactersArrows,
      SpecialCharacters,
      SpecialCharactersCurrency,
      SpecialCharactersEssentials,
      SpecialCharactersLatin,
      SpecialCharactersMathematical,
      SpecialCharactersText,
      Strikethrough,
      Style,
      GeneralHtmlSupport,
      Subscript,
      Superscript,
      TableCaption,
      TableCellProperties,
      TableProperties,
      Alignment,
      TodoList,
      Underline,
      BalloonToolbar,
      BlockToolbar,
      SourceEditing,
      Base64UploadAdapter,
    } = cloud.CKEditor;

    // 프리미엄 전용 플러그인 (cloud.CKEditorPremiumFeatures)
    const {
      CaseChange,
      PasteFromOfficeEnhanced,
      ExportPdf,
      ExportWord,
      Footnotes,
      FormatPainter,
      ImportWord,
      LineHeight,
      MultiLevelList,
      TableOfContents,
      Template,
    } = cloud.CKEditorPremiumFeatures;

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            "undo",
            "redo",
            "|",
            "importWord",
            "exportWord",
            "exportPdf",
            "|", // Word 입출력, PDF 저장
            "formatPainter",
            "caseChange", // 서식 복사, 대소문자 변환
            "findAndReplace",
            "fullscreen",
            "|", // 찾기 및 바꾸기, 전체화면
            "heading",
            "style",
            "|", // 제목 및 커스텀 스타일
            "fontSize",
            "fontFamily",
            "fontColor",
            "fontBackgroundColor",
            "|",
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "subscript",
            "superscript",
            "code",
            "removeFormat",
            "|", // 서식 지우기
            "specialCharacters",
            "horizontalLine",
            "pageBreak",
            "link",
            "imageUpload",
            "insertFootnote",
            "bookmark", // 이미지 업로드, 각주, 북마크
            "insertTable",
            "tableOfContents",
            "insertTemplate",
            "|", // 표, 목차, 템플릿 삽입
            "sourceEditing",
            "highlight",
            "blockQuote",
            "|",
            "alignment",
            "lineHeight",
            "|", // 정렬 및 줄 간격
            "bulletedList",
            "numberedList",
            "multiLevelList",
            "todoList",
            "outdent",
            "indent",
          ],
          shouldNotGroupWhenFull: true,
        },
        // 위에서 추출한 모든 플러그인을 배열에 담아 등록합니다.
        plugins: [
          Alignment,
          Autoformat,
          AutoImage,
          AutoLink,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          BlockToolbar,
          Bold,
          Bookmark,
          CaseChange,
          CloudServices,
          Code,
          Essentials,
          ExportPdf,
          ExportWord,
          FindAndReplace,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          Footnotes,
          FormatPainter,
          Fullscreen,
          GeneralHtmlSupport,
          Heading,
          Highlight,
          HorizontalLine,
          ImageBlock,
          ImageCaption,
          ImageEditing,
          ImageInline,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          ImageUpload,
          ImageUtils,
          ImportWord,
          Indent,
          IndentBlock,
          Italic,
          LineHeight,
          Link,
          LinkImage,
          List,
          ListProperties,
          MultiLevelList,
          PageBreak,
          Paragraph,
          PasteFromOffice,
          PasteFromOfficeEnhanced,
          RemoveFormat,
          SpecialCharacters,
          SpecialCharactersArrows,
          SpecialCharactersCurrency,
          SpecialCharactersEssentials,
          SpecialCharactersLatin,
          SpecialCharactersMathematical,
          SpecialCharactersText,
          Strikethrough,
          Style,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableOfContents,
          TableProperties,
          TableToolbar,
          Template,
          TextTransformation,
          TodoList,
          Underline,
          SourceEditing,
          Base64UploadAdapter,
        ],
        // balloonToolbar: 텍스트 선택 시 나타나는 플로팅 툴바
        balloonToolbar: [
          "bold",
          "italic",
          "|",
          "link",
          "|",
          "bulletedList",
          "numberedList",
        ],
        // blockToolbar: 빈 줄이나 블록 좌측에 나타나는 도구 버튼
        blockToolbar: [
          "fontSize",
          "fontColor",
          "fontBackgroundColor",
          "|",
          "bold",
          "italic",
          "|",
          "link",
          "insertTable",
          "|",
          "bulletedList",
          "numberedList",
          "outdent",
          "indent",
        ],
        fontFamily: {
          options: [
            "default",
            "Arial",
            "Courier New",
            "Georgia",
            "Lucida Sans Unicode",
            "Tahoma",
            "Times New Roman",
            "Trebuchet MS",
            "Verdana",
            "Noto Sans KR",
            "Pretendard",
          ],
          supportAllValues: true,
        },
        fontSize: {
          options: [10, 12, 14, "default", 18, 20, 22],
          supportAllValues: true,
        },
        // htmlSupport: 필터링되지 않은 모든 HTML 태그와 속성을 그대로 허용하는 설정
        htmlSupport: {
          allow: [
            { name: /^.*$/, styles: true, attributes: true, classes: true },
          ],
        },
        image: {
          toolbar: [
            "toggleImageCaption",
            "imageTextAlternative",
            "|",
            "imageStyle:inline",
            "imageStyle:wrapText",
            "imageStyle:breakText",
            "|",
            "resizeImage",
          ],
          upload: {
            types: ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg"],
          },
        },
        language: "ko",
        licenseKey: LICENSE_KEY_RICH, // 실제 운영 환경에서는 유효한 키가 필요합니다.
        lineHeight: { supportAllValues: true },
        // style: 에디터 내에서 사용할 커스텀 UI 스타일들을 정의합니다.
        style: {
          definitions: [
            { name: "Article category", element: "h3", classes: ["category"] },
            { name: "Title", element: "h2", classes: ["document-title"] },
            { name: "Subtitle", element: "h3", classes: ["document-subtitle"] },
            { name: "Info box", element: "p", classes: ["info-box"] },
            { name: "Marker", element: "span", classes: ["marker"] },
            { name: "Spoiler", element: "span", classes: ["spoiler"] },
          ],
        },
        table: {
          contentToolbar: [
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "tableProperties",
            "tableCellProperties",
          ],
        },
        /**
         * template: 자주 사용하는 문서 서식(템플릿)을 미리 정의해 두고 불러오는 기능입니다.
         * title, description, icon, data(HTML)로 구성됩니다.
         */
        template: {
          definitions: [
            {
              title: "Introduction",
              description: "Simple introduction to an article",
              icon: "<svg ... />", // 긴 SVG 코드는 생략 가능
              data: "<h2>Introduction</h2><p>이곳에 서론 내용을 입력하세요...</p>",
            },
          ],
        },
      },
    };
  }, [cloud, isLayoutReady]);

  const handleReady = (editor) => {
    editorInstance.current = editor;
    console.log("CKEditor 5 Rich is ready!", editor);
  };

  const handleChange = (event, editor) => {
    setEditorData(editor.getData());
  };

  if (
    cloud.status !== "success" ||
    !isLayoutReady ||
    !ClassicEditor ||
    !editorConfig
  ) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <p>CKEditor Rich를 로드하는 중...</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="CKEditor Rich"
        description="고급 기능을 포함한 CKEditor 5 Rich 버전 테스트 페이지입니다."
        keywords="CKEditor Rich, 프리미엄 에디터, 웹 에디터 데모"
        canonical="https://rich-editor-playground.com/ckeditor-rich"
      />
      <div className="editor-container">
        <div className="ckeditor-wrapper">
          <div
            ref={editorContainerRef}
            className="ckeditor5-container"
            role="textbox"
            aria-label="CKEditor Rich 에디터"
          >
            <CKEditor
              editor={ClassicEditor}
              data={editorData}
              config={editorConfig}
              onReady={handleReady}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="editor-footer">
          <div className="editor-footer-content">
            <div className="character-count">
              <span className="count-number">
                {editorData.replace(/<[^>]*>/g, "").length}
              </span>
              <span className="count-label">글자</span>
            </div>
          </div>
        </div>

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

export default CKEditorRich;
