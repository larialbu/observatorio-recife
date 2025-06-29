import { Html, Head, Main, NextScript } from 'next/document';

import { SEO_CONFIG } from '@/utils/config/seo_config';

export default function Document() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    "name": "Observatório Econômico do Recife",
    "description": SEO_CONFIG.description,
    "license": "https://creativecommons.org/licenses/by/4.0/",
    "isAccessibleForFree": true,
    "keywords": SEO_CONFIG.keywords.split(', '),
    "spatialCoverage": {
      "@type": "City",
      "name": "Recife",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "PE",
        "addressCountry": "BR"
      }
    },
    "temporalCoverage": "2010/2024",
    "variableMeasured": [
      "Inflação",
      "Taxa de juros",
      "Emprego",
      "Balança comercial",
      "Movimentação portuária",
      "Aeroportos",
      "Selic",
      "PIB",
      "Rais"
    ],
    "distribution": {
      "@type": "DataDownload",
      "encodingFormat": "CSV"
    },
    "publisher": {
      "@type": "GovernmentOrganization",
      "name": "Prefeitura do Recife",
      "url": "https://www.recife.pe.gov.br"
    },
    "maintainer": {
      "@type": "Organization",
      "name": "Secretaria de Desenvolvimento Econômico do Recife",
      "url": "https://www2.recife.pe.gov.br/pagina/secretaria-de-desenvolvimento-economico-sdec"
    }
  };

  return (
    <Html lang="pt-br">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={SEO_CONFIG.description} />
        <meta name="keywords" content={SEO_CONFIG.keywords} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={SEO_CONFIG.title} />
        <meta property="og:description" content={SEO_CONFIG.description} />
        <meta property="og:image" content={`${SEO_CONFIG.siteUrl}${SEO_CONFIG.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href={SEO_CONFIG.siteUrl} />
        <meta name="theme-color" content="#ffffff" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
