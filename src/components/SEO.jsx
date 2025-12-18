/**
 * @file SEO.jsx
 * @description react-helmet-async를 사용하여 HTML head 섹션의 메타 태그를 관리하는 컴포넌트입니다.
 * 검색 엔진 최적화(SEO) 및 소셜 미디어 공유(Open Graph, Twitter) 시 표시되는 정보를 제어합니다.
 */

import { Helmet } from "react-helmet-async";

function SEO({
  title, // 페이지 제목
  description, // 페이지 설명
  keywords, // 키워드 목록
  ogImage, // 공유 시 이미지 경로
  canonical, // 대표 URL
  type = "website", // 콘텐츠 타입 (기본: website)
}) {
  const siteUrl = "https://rich-editor-playground.com";

  // 전달받은 props가 없을 경우 사용할 기본값들을 설정합니다.
  const fullTitle = title
    ? `${title} | Rich Editor Playground`
    : "Rich Editor Playground - 웹 에디터 테스트 플랫폼";
  const fullDescription =
    description ||
    "TipTap, CKEditor Basic, CKEditor Rich 등 다양한 리치 텍스트 에디터를 한 곳에서 비교하고 테스트할 수 있는 플랫폼입니다.";
  const fullKeywords =
    keywords ||
    "리치 텍스트 에디터, TipTap, CKEditor, 웹 에디터, 텍스트 에디터, WYSIWYG, 에디터 비교, 에디터 테스트, 오픈소스 에디터, React 에디터";
  const fullCanonical = canonical || siteUrl;
  const fullOgImage = ogImage || `${siteUrl}/og-image.png`;

  return (
    /**
     * Helmet: React 컴포넌트 내에서 <head> 태그 내부의 수정을 가능하게 해줍니다.
     */
    <Helmet>
      {/* Primary Meta Tags: 기본 검색 결과에 노출되는 정보 */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />

      {/* Open Graph / Facebook: 페이스북, 카카오톡 등에서 링크 공유 시 표시되는 정보 */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:site_name" content="Rich Editor Playground" />

      {/* Twitter: 트위터 공유 시 최적화된 카드 형태로 표시되는 정보 */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={fullDescription} />
      <meta property="twitter:image" content={fullOgImage} />

      {/* Canonical URL: 동일한 콘텐츠가 여러 URL에 있을 때, 검색 엔진에게 대표 URL을 알려줍니다. (중복 콘텐츠 방지) */}
      <link rel="canonical" href={fullCanonical} />
    </Helmet>
  );
}

export default SEO;
