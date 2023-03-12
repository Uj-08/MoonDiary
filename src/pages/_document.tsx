import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head> 
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dancing+Script:wght@600&display=swap" rel="stylesheet" /> 
        <link href="https://fonts.googleapis.com/css2?family=Babylonica&family=Montserrat:wght@500&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <Main />
        <div id="modal-portal" />
        <NextScript />
      </body>
    </Html>
  )
}
