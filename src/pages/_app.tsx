/* eslint-disable @next/next/no-page-custom-font */
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import NextHead from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NextNProgress from 'nextjs-progressbar';
import Base from '@/containers/Base/Base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  body {
    background-color: #ededed;
    min-width: 360px;
  }

  .next-progress-spinner {
    display: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
      <NextHead>
        <title>MoonDiary</title>
      </NextHead>
      <Provider store={store}>
        <GlobalStyle />
        <NextNProgress color="#b101b1" height={2} options={{
          showSpinner: false,
        }} />
        <QueryClientProvider client={queryClient}>
          <Base>
            <Component {...pageProps} />
          </Base>
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}