import { useState, useEffect, useRef, useMemo } from 'react'
import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react'

function CKEditorBasic() {
  const [editorData, setEditorData] = useState('<p>CKEditor 5 Basic 버전 테스트를 시작하세요!</p>')
  const editorInstance = useRef(null)
  const [isLayoutReady, setIsLayoutReady] = useState(false)
  
  // Cloud 초기화 (프리미엄 기능 없이)
  const cloud = useCKEditorCloud({ version: '47.3.0', premium: false, translations: ['ko'] })

  useEffect(() => {
    setIsLayoutReady(true)
    return () => {
      setIsLayoutReady(false)
      if (editorInstance.current) {
        try {
          editorInstance.current.destroy()
        } catch (error) {
          console.warn('Error destroying editor:', error)
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
      SourceEditing
    } = cloud.CKEditor

    return {
      ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'heading',
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
            '|',
            'alignment',
            '|',
            'numberedList',
            'bulletedList',
            'todoList',
            '|',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'link',
            'mediaEmbed',
            '|',
            'horizontalLine',
            '|',
            'codeBlock',
            '|',
            'sourceEditing'
          ],
          shouldNotGroupWhenFull: true
        },
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
          SourceEditing
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
        heading: {
          options: [
            { model: 'paragraph', title: '본문', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: '제목 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: '제목 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: '제목 3', class: 'ck-heading_heading3' }
          ]
        },
        fontSize: {
          options: [9, 11, 13, 'default', 17, 19, 21, 27, 35]
        },
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
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
          ]
        },
        image: {
          toolbar: [
            'imageStyle:inline',
            'imageStyle:block',
            'imageStyle:side',
            '|',
            'toggleImageCaption',
            'imageTextAlternative'
          ]
        },
        language: 'ko',
        // Basic 버전 라이선스 키 (GPL 또는 환경 변수에서 가져옴)
        // 환경 변수가 없으면 'GPL' 사용 (무료)
        licenseKey: import.meta.env.VITE_CKEDITOR_LICENSE_KEY_BASIC || 'GPL'
      }
    }
  }, [cloud, isLayoutReady])

  const handleReady = (editor) => {
    editorInstance.current = editor
    console.log('CKEditor 5 Basic is ready to use!', editor)
  }

  const handleChange = (event, editor) => {
    const newData = editor.getData()
    setEditorData(newData)
    console.log('CKEditor 5 Basic content:', newData)
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

export default CKEditorBasic
