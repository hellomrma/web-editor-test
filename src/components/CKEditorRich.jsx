import { useState, useEffect, useRef, useMemo } from 'react'
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react'

// Rich 버전용 프리미엄 라이선스 키
const LICENSE_KEY_RICH = import.meta.env.VITE_CKEDITOR_LICENSE_KEY_RICH || ''

function CKEditorRich() {
  const [editorData, setEditorData] = useState('<p>CKEditor 5 Rich 버전 테스트를 시작하세요!</p>')
  const editorInstance = useRef(null)
  const editorContainerRef = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  
  // Cloud 초기화는 컴포넌트 마운트 시에만 실행
  const cloud = useCKEditorCloud({ version: '47.3.0', premium: true, translations: ['ko'] })

  useEffect(() => {
    setIsLayoutReady(true)
    return () => {
      setIsLayoutReady(false)
      // 에디터 인스턴스 정리
      if (editorInstance.current) {
        try {
          editorInstance.current.destroy()
        } catch (error) {
          console.warn('Error destroying Rich editor:', error)
        }
        editorInstance.current = null
      }
    }
  }, [])

  const { ClassicEditor, editorConfig } = useMemo(() => {
    if (cloud.status !== 'success' || !isLayoutReady) {
      return {}
    }

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
      Base64UploadAdapter
    } = cloud.CKEditor

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
      Template
    } = cloud.CKEditorPremiumFeatures

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'importWord',
            'exportWord',
            'exportPdf',
            'formatPainter',
            'caseChange',
            'findAndReplace',
            'fullscreen',
            '|',
            'heading',
            'style',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'specialCharacters',
            'horizontalLine',
            'pageBreak',
            'link',
            'imageUpload',
            'insertFootnote',
            'bookmark',
            'insertTable',
            'tableOfContents',
            'insertTemplate',
            '|',
            'sourceEditing',
            'highlight',
            'blockQuote',
            '|',
            'alignment',
            'lineHeight',
            '|',
            'bulletedList',
            'numberedList',
            'multiLevelList',
            'todoList',
            'outdent',
            'indent'
          ],
          shouldNotGroupWhenFull: true
        },
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
          Base64UploadAdapter
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
        blockToolbar: [
          'fontSize',
          'fontColor',
          'fontBackgroundColor',
          '|',
          'bold',
          'italic',
          '|',
          'link',
          'insertTable',
          '|',
          'bulletedList',
          'numberedList',
          'outdent',
          'indent'
        ],
        fontFamily: {
          options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif',
            'Noto Sans KR, sans-serif',
            'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif'
          ],
          supportAllValues: true
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        fullscreen: {
          onEnterCallback: container =>
            container.classList.add(
              'editor-container',
              'editor-container_classic-editor',
              'editor-container_include-style',
              'editor-container_include-block-toolbar',
              'editor-container_include-fullscreen',
              'main-container'
            )
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: '본문',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: '제목 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: '제목 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: '제목 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: '제목 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: '제목 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: '제목 6',
              class: 'ck-heading_heading6'
            }
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ],
          upload: {
            types: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp', 'svg']
          }
        },
        simpleUpload: {
          uploadUrl: '',
          withCredentials: false,
          headers: {}
        },
        language: 'ko',
        // Rich 버전용 프리미엄 라이선스 키
        licenseKey: LICENSE_KEY_RICH,
        lineHeight: {
          supportAllValues: true
        },
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        placeholder: '내용을 입력하세요...',
        style: {
          definitions: [
            {
              name: 'Article category',
              element: 'h3',
              classes: ['category']
            },
            {
              name: 'Title',
              element: 'h2',
              classes: ['document-title']
            },
            {
              name: 'Subtitle',
              element: 'h3',
              classes: ['document-subtitle']
            },
            {
              name: 'Info box',
              element: 'p',
              classes: ['info-box']
            },
            {
              name: 'CTA Link Primary',
              element: 'a',
              classes: ['button', 'button--green']
            },
            {
              name: 'CTA Link Secondary',
              element: 'a',
              classes: ['button', 'button--black']
            },
            {
              name: 'Marker',
              element: 'span',
              classes: ['marker']
            },
            {
              name: 'Spoiler',
              element: 'span',
              classes: ['spoiler']
            }
          ]
        },
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        template: {
          definitions: [
            {
              title: 'Introduction',
              description: 'Simple introduction to an article',
              icon: '<svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="icons/article-image-right"><rect id="icon-bg" width="45" height="45" rx="2" fill="#A5E7EB"/><g id="page" filter="url(#filter0_d_1_507)"><path d="M9 41H36V12L28 5H9V41Z" fill="white"/><path d="M35.25 12.3403V40.25H9.75V5.75H27.7182L35.25 12.3403Z" stroke="#333333" stroke-width="1.5"/></g><g id="image"><path id="Rectangle 22" d="M21.5 23C21.5 22.1716 22.1716 21.5 23 21.5H31C31.8284 21.5 32.5 22.1716 32.5 23V29C32.5 29.8284 31.8284 30.5 31 30.5H23C22.1716 30.5 21.5 29.8284 21.5 29V23Z" fill="#B6E3FC" stroke="#333333"/><path id="Vector 1" d="M24.1184 27.8255C23.9404 27.7499 23.7347 27.7838 23.5904 27.9125L21.6673 29.6268C21.5124 29.7648 21.4589 29.9842 21.5328 30.178C21.6066 30.3719 21.7925 30.5 22 30.5H32C32.2761 30.5 32.5 30.2761 32.5 30V27.7143C32.5 27.5717 32.4391 27.4359 32.3327 27.3411L30.4096 25.6268C30.2125 25.451 29.9127 25.4589 29.7251 25.6448L26.5019 28.8372L24.1184 27.8255Z" fill="#44D500" stroke="#333333" stroke-linejoin="round"/><circle id="Ellipse 1" cx="26" cy="25" r="1.5" fill="#FFD12D" stroke="#333333"/></g><rect id="Rectangle 23" x="13" y="13" width="12" height="2" rx="1" fill="#B4B4B4"/><rect id="Rectangle 24" x="13" y="17" width="19" height="2" rx="1" fill="#B4B4B4"/><rect id="Rectangle 25" x="13" y="21" width="6" height="2" rx="1" fill="#B4B4B4"/><rect id="Rectangle 26" x="13" y="25" width="6" height="2" rx="1" fill="#B4B4B4"/><rect id="Rectangle 27" x="13" y="29" width="6" height="2" rx="1" fill="#B4B4B4"/><rect id="Rectangle 28" x="13" y="33" width="16" height="2" rx="1" fill="#B4B4B4"/></g><defs><filter id="filter0_d_1_507" x="9" y="5" width="28" height="37" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/><feOffset dx="1" dy="1"/><feComposite in2="hardAlpha" operator="out"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.29 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_507"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_507" result="shape"/></filter></defs></svg>',
              data: "<h2>Introduction</h2><p>In today's fast-paced world, keeping up with the latest trends and insights is essential for both personal growth and professional development. This article aims to shed light on a topic that resonates with many, providing valuable information and actionable advice. Whether you're seeking to enhance your knowledge, improve your skills, or simply stay informed, our comprehensive analysis offers a deep dive into the subject matter, designed to empower and inspire our readers.</p>"
            }
          ]
        }
      }
    }
  }, [cloud, isLayoutReady])

  const handleReady = (editor) => {
    editorInstance.current = editor
    console.log('CKEditor 5 is ready to use!', editor)
  }

  const handleChange = (event, editor) => {
    const newData = editor.getData()
    setEditorData(newData)
    console.log('CKEditor 5 content:', newData)
  }

  if (cloud.status !== 'success' || !isLayoutReady || !ClassicEditor || !editorConfig) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <p>CKEditor를 로드하는 중...</p>
      </div>
    )
  }

  return (
    <div className="editor-container">
      <div className="ckeditor-wrapper">
        <div 
          ref={editorContainerRef}
          className="ckeditor5-container"
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
            <span className="count-number">{editorData.replace(/<[^>]*>/g, '').length}</span>
            <span className="count-label">글자</span>
          </div>
        </div>
      </div>

      <div className="editor-output">
        <div className="output-header">
          <h3>출력 데이터</h3>
          <span className="output-badge">HTML</span>
        </div>
        <pre className="output-content">
          {editorData}
        </pre>
      </div>
    </div>
  )
}

export default CKEditorRich
