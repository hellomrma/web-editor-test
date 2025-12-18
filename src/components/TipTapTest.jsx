/**
 * @file TipTapTest.jsx
 * @description Tiptap 에디터를 활용한 리치 텍스트 에디터 테스트 컴포넌트입니다.
 * Tiptap은 Headless 에디터 브라우저 프레임워크인 ProseMirror를 기반으로 구축되었으며,
 * 필요한 기능을 Extension(확장) 단위로 추가하여 자유롭게 구성할 수 있는 것이 강력한 장점입니다.
 */

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import SEO from "./SEO";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Highlight from "@tiptap/extension-highlight";
import { Color } from "@tiptap/extension-color";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Focus from "@tiptap/extension-focus";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import CharacterCount from "@tiptap/extension-character-count";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Code2,
  Minus,
  Image as ImageIcon,
  Table as TableIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Highlighter,
  Type,
  CodeXml,
  Plus,
  Trash2,
  Columns,
  Rows,
  Merge,
  Split,
  Palette,
} from "lucide-react";

function TipTapTest() {
  // 에디터의 HTML 콘텐츠 상태 관리
  const [editorData, setEditorData] = useState(
    "<p>TipTap 테스트를 시작하세요!</p>"
  );
  // 소스 코드 편집 모드 상태
  const [isSourceMode, setIsSourceMode] = useState(false);
  // 소스 편집 시 사용할 임시 코드 상태
  const [sourceCode, setSourceCode] = useState("");

  /**
   * useEditor: Tiptap 에디터 인스턴스를 생성하는 훅입니다.
   * extensions 배열에 사용할 기능들을 정의합니다.
   */
  const editor = useEditor({
    extensions: [
      /**
       * StarterKit: 필수적인 기본 기능 모음 (Blockquote, Bold, BulletList, Code, Document,
       * Dropcursor, Gapcursor, HardBreak, Heading, History, Italic, ListItem, OrderedList,
       * Paragraph, Strike, Text 등 포함)
       * 특정 기능에 대한 개별 설정이 필요한 경우 여기서 false로 비활성화 가능합니다.
       */
      StarterKit.configure({
        link: false, // Link 확장을 별도로 설정하기 위해 비활성화
        underline: false, // Underline 확장을 별도로 설정하기 위해 비활성화
        // codeBlock: false, // 코드 블록 확장을 별도로 설정할 경우 비활성화
      }),
      // 텍스트 스타일을 적용하기 위한 기본 확장
      TextStyle,
      // 폰트 패밀리(글꼴)를 변경하는 확장
      FontFamily.configure({
        types: ["textStyle"], // TextStyle 확장과 함께 작동하도록 설정
      }),
      // 텍스트 색상을 변경하는 확장
      Color,
      // 텍스트 정렬(왼쪽, 가운데, 오른쪽, 양쪽 맞춤)을 위한 확장
      TextAlign.configure({
        types: ["heading", "paragraph"], // 제목과 단락에 정렬 적용
      }),
      // 텍스트에 밑줄을 추가하는 확장
      Underline,
      // 텍스트에 아래 첨자를 추가하는 확장 (예: H₂O)
      Subscript,
      // 텍스트에 위 첨자를 추가하는 확장 (예: x²)
      Superscript,
      // 텍스트에 하이라이트(형광펜) 효과를 추가하는 확장
      Highlight.configure({
        multicolor: true, // 여러 색상의 하이라이트 지원 여부
      }),
      // 링크(하이퍼링크) 기능을 위한 확장
      Link.configure({
        openOnClick: false, // 클릭 시 바로 열리지 않고 편집 가능하게 설정
        HTMLAttributes: {
          class: "tiptap-link", // 생성되는 링크 태그에 CSS 클래스 추가
        },
      }),
      // 이미지 삽입 기능을 위한 확장
      Image.configure({
        inline: true, // 이미지를 인라인 요소로 처리 (텍스트 흐름에 맞춤)
        allowBase64: true, // Base64 인코딩된 이미지 데이터 허용 여부
      }),
      /**
       * Table Extensions: 표 기능을 위해 필요한 확장들입니다.
       * resizable: true를 설정하여 마우스 드래그로 셀 크기 조절이 가능하게 합니다.
       */
      Table.configure({
        resizable: true, // 표의 셀 크기 조절 가능 여부
      }),
      // 표의 행(row)을 위한 확장
      TableRow,
      // 표의 헤더(header) 셀을 위한 확장
      TableHeader,
      /**
       * TableCell을 확장(extend)하여 'backgroundColor'라는 커스텀 속성을 추가합니다.
       * 이를 통해 표의 셀마다 배경색을 지정할 수 있습니다.
       * addAttributes 메서드를 오버라이드하여 새로운 속성을 정의합니다.
       */
      TableCell.extend({
        addAttributes() {
          return {
            ...this.parent?.(), // 부모(기존 TableCell)의 속성을 상속
            backgroundColor: {
              default: null, // 기본값은 없음
              // HTML에서 속성 값을 파싱하는 로직 정의
              parseHTML: (element) => {
                const bgColor =
                  element.getAttribute("data-background-color") ||
                  element.style.backgroundColor;
                return bgColor || null;
              },
              // HTML로 렌더링할 때 속성을 어떻게 출력할지 정의
              renderHTML: (attributes) => {
                if (!attributes.backgroundColor) {
                  return {}; // 배경색이 없으면 아무 속성도 추가하지 않음
                }
                return {
                  "data-background-color": attributes.backgroundColor, // 커스텀 데이터 속성
                  style: `background-color: ${attributes.backgroundColor}`, // 인라인 스타일
                };
              },
            },
          };
        },
      }),
      // 에디터가 비어있을 때 표시되는 플레이스홀더 텍스트 확장
      Placeholder.configure({
        placeholder: "내용을 입력하세요...",
      }),
      // 에디터 요소에 포커스 상태를 시각적으로 표시하는 확장
      Focus.configure({
        className: "has-focus", // 포커스 시 추가될 CSS 클래스
        mode: "all", // 에디터 전체에 포커스 적용
      }),
      // 체크리스트(할 일 목록) 기능을 위한 확장
      TaskList,
      // 체크리스트의 개별 항목을 위한 확장
      TaskItem.configure({
        nested: true, // 체크리스트 항목의 중첩(하위 항목) 지원
      }),
      // 타이포그래피 개선 (예: '-->'를 '→'로 자동 변환, 스마트 인용 부호 등)
      Typography,
      // 글자 수 및 단어 수를 세는 확장
      CharacterCount,
    ],
    content: editorData, // 에디터의 초기 콘텐츠 설정
    editorProps: {
      attributes: {
        // 에디터 컨테이너에 적용할 CSS 클래스
        class: "prose focus:outline-none", // Tailwind CSS Prose 클래스 또는 커스텀 스타일 적용
      },
    },
    // 에디터 내용 업데이트 시 실행되는 콜백 함수
    onUpdate: ({ editor }) => {
      const html = editor.getHTML(); // 현재 에디터의 HTML 콘텐츠 가져오기
      setEditorData(html); // 상태 업데이트
    },
  });

  // 이미지 추가 핸들러
  const addImage = () => {
    const url = window.prompt("이미지 URL을 입력하세요:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  // 표 추가 핸들러
  const addTable = () => {
    const rows = parseInt(
      window.prompt("행 개수를 입력하세요 (기본: 3):", "3") || "3"
    );
    const cols = parseInt(
      window.prompt("열 개수를 입력하세요 (기본: 3):", "3") || "3"
    );
    const withHeader = window.confirm("헤더 행을 포함하시겠습니까?");

    if (rows > 0 && cols > 0) {
      editor
        .chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: withHeader })
        .run();
    }
  };

  // 표 조작 함수들: editor.chain()을 사용하여 여러 명령을 연속적으로 실행할 수 있습니다.
  const addRowBefore = () => editor.chain().focus().addRowBefore().run();
  const addRowAfter = () => editor.chain().focus().addRowAfter().run();
  const deleteRow = () => editor.chain().focus().deleteRow().run();
  const addColumnBefore = () => editor.chain().focus().addColumnBefore().run();
  const addColumnAfter = () => editor.chain().focus().addColumnAfter().run();
  const deleteColumn = () => editor.chain().focus().deleteColumn().run();
  const deleteTable = () => editor.chain().focus().deleteTable().run();

  /**
   * 셀 병합 핸들러
   * 2개 이상의 셀을 드래그하여 선택한 상태에서 작동합니다.
   * 테이블 내부에 커서가 없거나 병합할 수 없는 상태일 경우 사용자에게 알립니다.
   */
  const mergeCells = () => {
    try {
      if (!editor.isActive("table")) {
        alert("테이블 내부에 커서를 두고 다시 시도해주세요.");
        return;
      }

      if (editor.can().mergeCells()) {
        editor.chain().focus().mergeCells().run();
      } else {
        alert("병합하려면 2개 이상의 셀을 드래그하여 선택해야 합니다.");
      }
    } catch (error) {
      console.error("Merge cells error:", error);
      alert("셀 병합 중 오류가 발생했습니다.");
    }
  };

  /**
   * 셀 분할 핸들러
   * 이미 병합된 셀에 커서가 위치할 때 작동합니다.
   * 분할할 수 없는 상태일 경우 사용자에게 알립니다.
   */
  const splitCell = () => {
    try {
      if (!editor.isActive("table")) {
        alert("테이블 내부에 커서를 두고 다시 시도해주세요.");
        return;
      }

      if (editor.can().splitCell()) {
        editor.chain().focus().splitCell().run();
      } else {
        alert("분할할 수 있는 병합된 셀이 없습니다.");
      }
    } catch (error) {
      console.error("Split cell error:", error);
      alert("셀 분할 중 오류가 발생했습니다.");
    }
  };

  // 현재 커서가 있는 행을 헤더 행으로 토글하거나 일반 행으로 되돌립니다.
  const toggleHeaderRow = () => editor.chain().focus().toggleHeaderRow().run();
  // 현재 커서가 있는 열을 헤더 열으로 토글하거나 일반 열으로 되돌립니다.
  const toggleHeaderColumn = () =>
    editor.chain().focus().toggleHeaderColumn().run();

  // 셀 배경색 지정 핸들러 (TableCell.extend로 추가한 'backgroundColor' 속성 활용)
  const setCellBackgroundColor = () => {
    const color = window.prompt(
      "배경색을 입력하세요 (예: #ff0000 또는 red):",
      "#ffffff"
    );
    if (color) {
      editor.chain().focus().setCellAttribute("backgroundColor", color).run();
    }
  };

  // 셀 배경색 제거 핸들러
  const removeCellBackgroundColor = () => {
    editor.chain().focus().setCellAttribute("backgroundColor", null).run();
  };

  // 폰트 패밀리 선택 옵션 목록
  const fontFamilies = [
    { label: "기본", value: "" },
    { label: "Noto Sans KR", value: '"Noto Sans KR", sans-serif' },
    {
      label: "Pretendard",
      value:
        '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
    },
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Courier New", value: "Courier New, monospace" },
  ];

  if (!editor) return null;

  // 현재 선택 영역의 폰트 패밀리 정보 가져오기
  const currentFontFamily = editor.getAttributes("textStyle").fontFamily || "";

  /**
   * toggleSourceMode: 에디터 뷰(Visual)와 HTML 소스 뷰 간의 전환을 처리합니다.
   * 소스 모드로 전환 시 현재 에디터 내용을 HTML로 가져와 textarea에 표시하고,
   * 소스 모드에서 일반 모드로 전환 시 textarea의 내용을 에디터에 적용합니다.
   */
  const toggleSourceMode = () => {
    if (!isSourceMode) {
      setSourceCode(editor.getHTML()); // 에디터의 현재 HTML 내용을 소스 코드 상태에 저장
      setIsSourceMode(true); // 소스 모드로 전환
    } else {
      editor.commands.setContent(sourceCode); // 소스 코드 내용을 에디터에 적용
      setIsSourceMode(false); // 일반 모드로 전환
    }
  };

  return (
    <>
      <SEO
        title="TipTap Editor"
        description="TipTap은 모던하고 확장 가능한 오픈소스 리치 텍스트 에디터입니다."
        keywords="TipTap, 리치 텍스트 에디터, 오픈소스"
      />
      <div className="editor-container">
        {/* Toolbar: 에디터 상단의 조작 버튼들 */}
        <div
          className="tiptap-menu-bar"
          role="toolbar"
          aria-label="에디터 툴바"
        >
          <div className="menu-group">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              disabled={!editor.can().chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "is-active" : ""}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "is-active" : ""}
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={editor.isActive("underline") ? "is-active" : ""}
              title="Underline"
            >
              <UnderlineIcon size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={editor.isActive("strike") ? "is-active" : ""}
              title="Strikethrough"
            >
              <Strikethrough size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={editor.isActive("code") ? "is-active" : ""}
              title="Inline Code"
            >
              <Code size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSubscript().run()}
              className={editor.isActive("subscript") ? "is-active" : ""}
              title="Subscript"
            >
              <Type size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleSuperscript().run()}
              className={editor.isActive("superscript") ? "is-active" : ""}
              title="Superscript"
            >
              <Type size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive("highlight") ? "is-active" : ""}
              title="Highlight"
            >
              <Highlighter size={18} />
            </button>
          </div>

          <div className="menu-divider"></div>

          <div className="menu-group">
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              className={
                editor.isActive("heading", { level: 1 }) ? "is-active" : ""
              }
              title="Heading 1"
            >
              <Heading1 size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }
              title="Heading 2"
            >
              <Heading2 size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              className={
                editor.isActive("heading", { level: 3 }) ? "is-active" : ""
              }
              title="Heading 3"
            >
              <Heading3 size={18} />
            </button>
          </div>

          <div className="menu-divider"></div>

          <div className="menu-group">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive("bulletList") ? "is-active" : ""}
              title="Bullet List"
            >
              <List size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive("orderedList") ? "is-active" : ""}
              title="Ordered List"
            >
              <ListOrdered size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={editor.isActive("blockquote") ? "is-active" : ""}
              title="Blockquote"
            >
              <Quote size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive("codeBlock") ? "is-active" : ""}
              title="Code Block"
            >
              <Code2 size={18} />
            </button>
          </div>

          <div className="menu-divider"></div>

          {/* 폰트 및 색상 설정 */}
          <div className="menu-group">
            <select
              className="font-family-select"
              value={currentFontFamily}
              onChange={(e) => {
                const fontFamily = e.target.value;
                if (fontFamily) {
                  editor.chain().focus().setFontFamily(fontFamily).run();
                } else {
                  editor.chain().focus().unsetFontFamily().run();
                }
              }}
              title="Font Family"
            >
              {fontFamilies.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
            <input
              type="color"
              className="color-picker"
              onChange={(e) =>
                editor.chain().focus().setColor(e.target.value).run()
              }
              title="Text Color"
            />
          </div>

          <div className="menu-divider"></div>

          <div className="menu-group">
            <button
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              className={
                editor.isActive({ textAlign: "left" }) ? "is-active" : ""
              }
              title="Align Left"
            >
              <AlignLeft size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              className={
                editor.isActive({ textAlign: "center" }) ? "is-active" : ""
              }
              title="Align Center"
            >
              <AlignCenter size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              className={
                editor.isActive({ textAlign: "right" }) ? "is-active" : ""
              }
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>
            <button
              onClick={() =>
                editor.chain().focus().setTextAlign("justify").run()
              }
              className={
                editor.isActive({ textAlign: "justify" }) ? "is-active" : ""
              }
              title="Justify"
            >
              <AlignJustify size={18} />
            </button>
          </div>

          <div className="menu-divider"></div>

          {/* 미디어 및 테이블 삽입 */}
          <div className="menu-group">
            <button
              onClick={() => {
                const url = window.prompt("링크 URL을 입력하세요:");
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }}
              className={editor.isActive("link") ? "is-active" : ""}
              title="Insert Link"
            >
              <LinkIcon size={18} />
            </button>
            <button onClick={addImage} title="Insert Image">
              <ImageIcon size={18} />
            </button>
            <button onClick={addTable} title="Insert Table">
              <TableIcon size={18} />
            </button>
          </div>

          {/* 테이블 에디팅 도구 (테이블 활성화 시에만 노출) */}
          {editor.isActive("table") && (
            <>
              <div className="menu-divider"></div>
              <div className="menu-group">
                <button onClick={addRowBefore} title="Add Row Before">
                  <Rows size={18} />
                </button>
                <button onClick={addRowAfter} title="Add Row After">
                  <Plus size={18} />
                </button>
                <button onClick={deleteRow} title="Delete Row">
                  <Trash2 size={18} />
                </button>
                <button onClick={addColumnBefore} title="Add Column Before">
                  <Columns size={18} />
                </button>
                <button onClick={addColumnAfter} title="Add Column After">
                  <Plus size={18} />
                </button>
                <button onClick={deleteColumn} title="Delete Column">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="menu-divider"></div>
              <div className="menu-group">
                <button onClick={mergeCells} title="Merge Cells">
                  <Merge size={18} />
                </button>
                <button onClick={splitCell} title="Split Cell">
                  <Split size={18} />
                </button>
                <button
                  onClick={setCellBackgroundColor}
                  title="Set Cell Background Color"
                >
                  <Palette size={18} />
                </button>
                <button
                  onClick={removeCellBackgroundColor}
                  title="Remove Cell Background Color"
                >
                  <Trash2 size={18} />
                </button>
                <button onClick={toggleHeaderRow} title="Toggle Header Row">
                  <Rows size={18} />
                </button>
                <button
                  onClick={toggleHeaderColumn}
                  title="Toggle Header Column"
                >
                  <Columns size={18} />
                </button>
                <button onClick={deleteTable} title="Delete Table">
                  <Trash2 size={18} />
                </button>
              </div>
            </>
          )}

          <div className="menu-divider"></div>

          <div className="menu-group">
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              title="Insert Horizontal Rule"
            >
              <Minus size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo"
            >
              <Undo size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo"
            >
              <Redo size={18} />
            </button>
          </div>

          <div className="menu-divider"></div>

          {/* 소스 코드 편집 모드 버튼 */}
          <div className="menu-group">
            <button
              onClick={toggleSourceMode}
              className={isSourceMode ? "is-active" : ""}
              title="HTML Source"
            >
              <CodeXml size={18} />
            </button>
          </div>
        </div>

        {/* Content Area: 현재 모드에 따라 에디터 또는 텍스트 에리어 렌더링 */}
        {isSourceMode ? (
          <div className="editor-wrapper source-editor">
            <textarea
              className="source-code-textarea"
              value={sourceCode}
              onChange={(e) => setSourceCode(e.target.value)}
              spellCheck={false}
              placeholder="HTML 코드를 입력하세요..."
            />
            <div className="source-editor-actions">
              <button className="source-save-btn" onClick={toggleSourceMode}>
                적용
              </button>
              <button
                className="source-cancel-btn"
                onClick={() => {
                  setIsSourceMode(false); // 소스 모드 취소
                  setSourceCode(editor.getHTML()); // 에디터의 원래 내용으로 되돌림
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : (
          <div className="editor-wrapper tiptap-editor">
            {/* EditorContent: 실제 Tiptap 에디터가 위치하는 컴포넌트 */}
            <EditorContent editor={editor} className="tiptap-content" />
          </div>
        )}
      </div>

      {/* Footer: 글자 수 및 단어 수 통계 (CharacterCount 확장 활용) */}
      <div className="editor-footer">
        <div className="editor-footer-content">
          <div className="character-count">
            <span className="count-number">
              {editor.storage.characterCount.characters()}
            </span>
            <span className="count-label">글자</span>
            <span style={{ margin: "0 0.5rem", color: "var(--text-tertiary)" }}>
              /
            </span>
            <span className="count-number">
              {editor.storage.characterCount.words()}
            </span>
            <span className="count-label">단어</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default TipTapTest;
