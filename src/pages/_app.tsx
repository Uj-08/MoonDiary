/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    /* background-color: red; */
    /* scrollbar-gutter: hidden; */
  }
  
  body {
    overflow: overlay;
    scrollbar-gutter: stable;
    min-width: 1200px;
  }

  ::-webkit-scrollbar {
    width: 10px;
    overflow: overlay;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background-color: #73737344;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #0000008b;
    border-radius: 10px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #000000bb;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
        <Head>
          <title>MoonDiary</title>
          {/* <link rel="icon" href="" /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Anton&family=Dancing+Script:wght@600&display=swap" rel="stylesheet" /> 
          <link href="https://fonts.googleapis.com/css2?family=Babylonica&family=Montserrat:wght@500&display=swap" rel="stylesheet" />
        </Head>
        <GlobalStyle />
        <Component {...pageProps} />
    </GoogleOAuthProvider>
  )
}
