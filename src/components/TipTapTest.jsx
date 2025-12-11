import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import SEO from './SEO'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableHeader from '@tiptap/extension-table-header'
import TableCell from '@tiptap/extension-table-cell'
import { TextStyle } from '@tiptap/extension-text-style'
import FontFamily from '@tiptap/extension-font-family'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Focus from '@tiptap/extension-focus'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Typography from '@tiptap/extension-typography'
import CharacterCount from '@tiptap/extension-character-count'
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
} from 'lucide-react'

function TipTapTest() {
  const [editorData, setEditorData] = useState('<p>TipTap 테스트를 시작하세요!</p>')
  const [isSourceMode, setIsSourceMode] = useState(false)
  const [sourceCode, setSourceCode] = useState('')

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // StarterKit에 이미 포함된 확장을 제외하여 중복 방지
        link: false,
        underline: false,
      }),
      TextStyle,
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Subscript,
      Superscript,
      Highlight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
        },
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell.extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            backgroundColor: {
              default: null,
              parseHTML: element => {
                const bgColor = element.getAttribute('data-background-color') || 
                               element.style.backgroundColor
                return bgColor || null
              },
              renderHTML: attributes => {
                if (!attributes.backgroundColor) {
                  return {}
                }
                return {
                  'data-background-color': attributes.backgroundColor,
                  style: `background-color: ${attributes.backgroundColor}`,
                }
              },
            },
          }
        },
      }),
      Placeholder.configure({
        placeholder: '내용을 입력하세요...',
      }),
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      // Gapcursor와 Dropcursor는 StarterKit에 이미 포함되어 있으므로 제거
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Typography,
      CharacterCount,
    ],
    content: editorData,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      setEditorData(html)
      console.log('TipTap content:', html)
    },
  })

  const addImage = () => {
    const url = window.prompt('이미지 URL을 입력하세요:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addTable = () => {
    const rows = parseInt(window.prompt('행 개수를 입력하세요 (기본: 3):', '3') || '3')
    const cols = parseInt(window.prompt('열 개수를 입력하세요 (기본: 3):', '3') || '3')
    const withHeader = window.confirm('헤더 행을 포함하시겠습니까?')
    
    if (rows > 0 && cols > 0) {
      editor.chain().focus().insertTable({ rows, cols, withHeaderRow: withHeader }).run()
    }
  }

  const addRowBefore = () => {
    editor.chain().focus().addRowBefore().run()
  }

  const addRowAfter = () => {
    editor.chain().focus().addRowAfter().run()
  }

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run()
  }

  const addColumnBefore = () => {
    editor.chain().focus().addColumnBefore().run()
  }

  const addColumnAfter = () => {
    editor.chain().focus().addColumnAfter().run()
  }

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run()
  }

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run()
  }

  const mergeCells = () => {
    try {
      // 테이블 내부에 있는지 확인
      if (!editor.isActive('table')) {
        alert('테이블 내부에 커서를 두고 다시 시도해주세요.')
        return
      }

      // 병합 가능한지 확인
      if (editor.can().mergeCells()) {
        editor.chain().focus().mergeCells().run()
      } else {
        // 병합이 불가능한 경우 안내
        const { state } = editor
        const { selection } = state
        const { $anchor, $head } = selection
        
        // 선택 범위 확인
        const from = Math.min($anchor.pos, $head.pos)
        const to = Math.max($anchor.pos, $head.pos)
        const isMultiCellSelection = to - from > 0
        
        if (!isMultiCellSelection) {
          // 단일 셀만 선택된 경우
          alert('병합하려면 2개 이상의 셀을 선택해야 합니다.\n\n사용 방법:\n1. 테이블에서 첫 번째 셀을 클릭하고 드래그 시작\n2. 마우스를 드래그하여 여러 셀 선택 (2개 이상)\n3. 병합 버튼 클릭\n\n팁: 직사각형 영역의 인접한 셀들을 선택해야 합니다.')
        } else {
          // 여러 셀이 선택되었지만 병합이 안 되는 경우
          alert('선택한 셀들을 병합할 수 없습니다.\n\n병합 가능 조건:\n- 선택된 셀들이 직사각형 영역을 형성해야 합니다\n- 인접한 셀들만 병합할 수 있습니다\n- 이미 병합된 셀과 일반 셀은 함께 병합할 수 없습니다\n\n다시 시도:\n1. 마우스로 드래그하여 직사각형 영역의 인접한 셀들을 선택\n2. 병합 버튼 클릭')
        }
      }
    } catch (error) {
      console.error('Merge cells error:', error)
      alert('셀 병합 중 오류가 발생했습니다. 여러 셀을 선택한 후 다시 시도해주세요.')
    }
  }

  const splitCell = () => {
    try {
      // 테이블 내부에 있는지 확인
      if (!editor.isActive('table')) {
        alert('테이블 내부에 커서를 두고 다시 시도해주세요.')
        return
      }

      // 분할 가능한지 확인
      if (editor.can().splitCell()) {
        editor.chain().focus().splitCell().run()
      } else {
        const { state } = editor
        const { selection } = state
        const { $anchor } = selection
        
        // 현재 셀이 병합된 셀인지 확인
        const cell = $anchor.node(-1)
        if (cell && (cell.type.name === 'tableCell' || cell.type.name === 'tableHeader')) {
          const attrs = cell.attrs
          const hasColspan = attrs.colspan && attrs.colspan > 1
          const hasRowspan = attrs.rowspan && attrs.rowspan > 1
          
          if (!hasColspan && !hasRowspan) {
            alert('분할할 수 있는 셀이 없습니다.\n병합된 셀만 분할할 수 있습니다.')
          } else {
            alert('셀 분할을 시도했지만 실패했습니다. 병합된 셀에 커서를 두고 다시 시도해주세요.')
          }
        } else {
          alert('분할할 수 있는 셀이 없습니다. 병합된 셀에 커서를 두고 다시 시도해주세요.')
        }
      }
    } catch (error) {
      console.error('Split cell error:', error)
      alert('셀 분할 중 오류가 발생했습니다. 병합된 셀에 커서를 두고 다시 시도해주세요.')
    }
  }

  const toggleHeaderRow = () => {
    editor.chain().focus().toggleHeaderRow().run()
  }

  const toggleHeaderColumn = () => {
    editor.chain().focus().toggleHeaderColumn().run()
  }

  const setCellBackgroundColor = () => {
    const color = window.prompt('배경색을 입력하세요 (예: #ff0000 또는 red):', '#ffffff')
    if (color) {
      editor.chain().focus().setCellAttribute('backgroundColor', color).run()
    }
  }

  const removeCellBackgroundColor = () => {
    try {
      // 먼저 removeCellAttribute 시도
      if (editor.can().removeCellAttribute('backgroundColor')) {
        editor.chain().focus().removeCellAttribute('backgroundColor').run()
      } else {
        // removeCellAttribute가 작동하지 않으면 null로 설정
        editor.chain().focus().setCellAttribute('backgroundColor', null).run()
      }
    } catch (error) {
      // 에러 발생 시 null로 설정
      console.log('removeCellAttribute failed, using setCellAttribute with null:', error)
      editor.chain().focus().setCellAttribute('backgroundColor', null).run()
    }
  }


  const fontFamilies = [
    { label: '기본', value: '' },
    { label: 'Noto Sans KR', value: '"Noto Sans KR", sans-serif' },
    { label: 'Pretendard', value: '"Pretendard", -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif' },
    { label: 'Arial', value: 'Arial, sans-serif' },
    { label: 'Helvetica', value: 'Helvetica, sans-serif' },
    { label: 'Times New Roman', value: 'Times New Roman, serif' },
    { label: 'Courier New', value: 'Courier New, monospace' },
    { label: 'Georgia', value: 'Georgia, serif' },
    { label: 'Verdana', value: 'Verdana, sans-serif' },
    { label: 'Comic Sans MS', value: 'Comic Sans MS, cursive' },
    { label: 'Impact', value: 'Impact, sans-serif' },
    { label: 'Trebuchet MS', value: 'Trebuchet MS, sans-serif' },
  ]

  if (!editor) {
    return null
  }

  const currentFontFamily = editor.getAttributes('textStyle').fontFamily || ''

  const toggleSourceMode = () => {
    if (!isSourceMode) {
      // 소스 모드로 전환: 현재 HTML 가져오기
      setSourceCode(editor.getHTML())
      setIsSourceMode(true)
    } else {
      // 일반 모드로 전환: 소스 코드를 에디터에 적용
      editor.commands.setContent(sourceCode)
      setIsSourceMode(false)
    }
  }

  return (
    <>
      <SEO 
        title="TipTap Editor"
        description="TipTap은 모던하고 확장 가능한 오픈소스 리치 텍스트 에디터입니다. 테이블 편집, 이미지 삽입, 다양한 서식 옵션, 소스 모드를 지원합니다."
        keywords="TipTap, TipTap 에디터, 오픈소스 에디터, React 에디터, WYSIWYG 에디터, 리치 텍스트 에디터, ProseMirror"
        canonical="https://rich-editor-playground.com/tiptap"
      />
      <div className="editor-container">
        <div className="tiptap-menu-bar" role="toolbar" aria-label="에디터 툴바">
        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active' : ''}
            title="Bold"
          >
            <Bold size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active' : ''}
            title="Italic"
          >
            <Italic size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={editor.isActive('underline') ? 'is-active' : ''}
            title="Underline"
          >
            <UnderlineIcon size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive('strike') ? 'is-active' : ''}
            title="Strikethrough"
          >
            <Strikethrough size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={editor.isActive('code') ? 'is-active' : ''}
            title="Inline Code"
          >
            <Code size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleSubscript().run()}
            disabled={!editor.can().chain().focus().toggleSubscript().run()}
            className={editor.isActive('subscript') ? 'is-active' : ''}
            title="Subscript"
          >
            <Type size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleSuperscript().run()}
            disabled={!editor.can().chain().focus().toggleSuperscript().run()}
            className={editor.isActive('superscript') ? 'is-active' : ''}
            title="Superscript"
          >
            <Type size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            disabled={!editor.can().chain().focus().toggleHighlight().run()}
            className={editor.isActive('highlight') ? 'is-active' : ''}
            title="Highlight"
          >
            <Highlighter size={18} />
          </button>
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
            title="Heading 1"
          >
            <Heading1 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
            title="Heading 2"
          >
            <Heading2 size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
            title="Heading 3"
          >
            <Heading3 size={18} />
          </button>
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
            title="Bullet List"
          >
            <List size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive('orderedList') ? 'is-active' : ''}
            title="Ordered List"
          >
            <ListOrdered size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive('blockquote') ? 'is-active' : ''}
            title="Blockquote"
          >
            <Quote size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? 'is-active' : ''}
            title="Code Block"
          >
            <Code2 size={18} />
          </button>
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <select
            className="font-family-select"
            value={currentFontFamily}
            onChange={(e) => {
              const fontFamily = e.target.value
              if (fontFamily) {
                editor.chain().focus().setFontFamily(fontFamily).run()
              } else {
                editor.chain().focus().unsetFontFamily().run()
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
            onChange={(e) => {
              editor.chain().focus().setColor(e.target.value).run()
            }}
            title="Text Color"
          />
          <input
            type="color"
            className="color-picker"
            onChange={(e) => {
              editor.chain().focus().setHighlight({ color: e.target.value }).run()
            }}
            title="Highlight Color"
          />
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
            title="Align Left"
          >
            <AlignLeft size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
            title="Align Center"
          >
            <AlignCenter size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
            title="Align Right"
          >
            <AlignRight size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
            title="Justify"
          >
            <AlignJustify size={18} />
          </button>
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={() => {
              const url = window.prompt('링크 URL을 입력하세요:')
              if (url) {
                editor.chain().focus().setLink({ href: url }).run()
              }
            }}
            className={editor.isActive('link') ? 'is-active' : ''}
            title="Insert Link"
          >
            <LinkIcon size={18} />
          </button>
          <button
            onClick={() => {
              if (editor.isActive('link')) {
                editor.chain().focus().unsetLink().run()
              }
            }}
            disabled={!editor.isActive('link')}
            title="Remove Link"
          >
            <LinkIcon size={18} style={{ transform: 'rotate(45deg)' }} />
          </button>
          <button
            onClick={addImage}
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>
          <button
            onClick={addTable}
            title="Insert Table"
          >
            <TableIcon size={18} />
          </button>
        </div>

        {editor.isActive('table') && (
          <>
            <div className="menu-divider"></div>
            <div className="menu-group">
              <button
                onClick={addRowBefore}
                disabled={!editor.can().addRowBefore()}
                title="Add Row Before"
              >
                <Rows size={18} />
              </button>
              <button
                onClick={addRowAfter}
                disabled={!editor.can().addRowAfter()}
                title="Add Row After"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={deleteRow}
                disabled={!editor.can().deleteRow()}
                title="Delete Row"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-group">
              <button
                onClick={addColumnBefore}
                disabled={!editor.can().addColumnBefore()}
                title="Add Column Before"
              >
                <Columns size={18} />
              </button>
              <button
                onClick={addColumnAfter}
                disabled={!editor.can().addColumnAfter()}
                title="Add Column After"
              >
                <Plus size={18} />
              </button>
              <button
                onClick={deleteColumn}
                disabled={!editor.can().deleteColumn()}
                title="Delete Column"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-group">
              <button
                onClick={mergeCells}
                disabled={!editor.isActive('table')}
                title="Merge Selected Cells (병합) - 여러 셀을 드래그하여 선택한 후 클릭"
                className={editor.isActive('table') ? 'merge-enabled' : ''}
              >
                <Merge size={18} />
              </button>
              <button
                onClick={splitCell}
                disabled={!editor.isActive('table')}
                title="Split Merged Cell (분할) - 병합된 셀에 커서를 두고 클릭"
                className={editor.isActive('table') ? 'split-enabled' : ''}
              >
                <Split size={18} />
              </button>
            </div>
            <div className="menu-divider"></div>
            <div className="menu-group">
              <input
                type="color"
                className="color-picker"
                onChange={(e) => {
                  editor.chain().focus().setCellAttribute('backgroundColor', e.target.value).run()
                }}
                title="Cell Background Color"
              />
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
            </div>
            <div className="menu-divider"></div>
            <div className="menu-group">
              <button
                onClick={toggleHeaderRow}
                title="Toggle Header Row"
              >
                <Rows size={18} />
              </button>
              <button
                onClick={toggleHeaderColumn}
                title="Toggle Header Column"
              >
                <Columns size={18} />
              </button>
              <button
                onClick={deleteTable}
                disabled={!editor.can().deleteTable()}
                title="Delete Table"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </>
        )}

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
          >
            <Minus size={18} />
          </button>
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            title="Redo"
          >
            <Redo size={18} />
          </button>
        </div>

        <div className="menu-divider"></div>

        <div className="menu-group">
          <button
            onClick={toggleSourceMode}
            className={isSourceMode ? 'is-active' : ''}
            title="HTML Source Code"
          >
            <CodeXml size={18} />
          </button>
        </div>
      </div>

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
            <button
              className="source-save-btn"
              onClick={toggleSourceMode}
            >
              적용
            </button>
            <button
              className="source-cancel-btn"
              onClick={() => {
                setSourceCode(editor.getHTML())
                setIsSourceMode(false)
              }}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="editor-wrapper tiptap-editor">
          <EditorContent 
            editor={editor}
            className="tiptap-content"
          />
        </div>
      )}

      <div className="editor-footer">
        <div className="editor-footer-content">
          <div className="character-count">
            <span className="count-number">{editor.storage.characterCount.characters()}</span>
            <span className="count-label">글자</span>
            <span style={{ margin: '0 0.5rem', color: 'var(--text-tertiary)' }}>/</span>
            <span className="count-number">{editor.storage.characterCount.words()}</span>
            <span className="count-label">단어</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default TipTapTest
