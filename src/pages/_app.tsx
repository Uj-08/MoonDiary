/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import NextHead from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NextNProgress from 'nextjs-progressbar';

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
    background-color: #ededed;
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

  .next-progress-spinner {
    display: none;
}
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
        <NextHead>
          <title>MoonDiary</title>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
        </NextHead>
        <Provider store={store}>
          <GlobalStyle />
          <NextNProgress color="#b101b1" height={2} options={{
            showSpinner: false,
          }} />
          <Component {...pageProps} />
        </Provider>
    </GoogleOAuthProvider>
  )
}
