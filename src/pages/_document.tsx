import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

        <meta property="og:site_name" content="MoonDiary" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/cover.jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@MoonDiary" />

        <meta name="google-site-verification" content="DxXahG35Puco67FBn_AczaFs5kPLyzHjljN0x8tiq7U" />
      </Head>
      <body>
        <Main />
        <div id="modal-portal" />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const sheet = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          sheet.collectStyles(<App {...props} />),
      })

    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    }
  } finally {
    sheet.seal()
  }
}