import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default function MyDocument() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta charSet="UTF-8" />
        <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />

        <meta
          name="description"
          content="MoonDiary – your daily guide for astrology, reiki, and cosmic wisdom."
        />

        <meta property="og:site_name" content="MoonDiary" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/cover.jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@MoonDiary" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dancing+Script:wght@600&family=Babylonica&family=Montserrat:wght@500&display=swap" rel="stylesheet" />
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