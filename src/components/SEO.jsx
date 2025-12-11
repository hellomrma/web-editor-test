import { Helmet } from 'react-helmet-async'

function SEO({ 
  title, 
  description, 
  keywords, 
  ogImage,
  canonical,
  type = 'website'
}) {
  const siteUrl = 'https://rich-editor-playground.com'
  const fullTitle = title ? `${title} | Rich Editor Playground` : 'Rich Editor Playground - 웹 에디터 테스트 플랫폼'
  const fullDescription = description || 'TipTap, CKEditor Basic, CKEditor Rich 등 다양한 리치 텍스트 에디터를 한 곳에서 비교하고 테스트할 수 있는 플랫폼입니다.'
  const fullKeywords = keywords || '리치 텍스트 에디터, TipTap, CKEditor, 웹 에디터, 텍스트 에디터, WYSIWYG, 에디터 비교, 에디터 테스트, 오픈소스 에디터, React 에디터'
  const fullCanonical = canonical || siteUrl
  const fullOgImage = ogImage || `${siteUrl}/og-image.png`

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="Rich Editor Playground" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullOgImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
    </Helmet>
  )
}

export default SEO


