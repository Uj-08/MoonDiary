import React, { ReactElement, ReactNode, useState } from 'react';
import type { AppProps } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import NextHead from 'next/head';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import NextTopLoader from 'nextjs-toploader';
import Base from '@/containers/Base/Base';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NextPage } from 'next';

type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

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

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());

  const getLayout = Component.getLayout ?? ((page) => <Base>{page}</Base>);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_CLIENT_ID || ""}>
      <NextHead>
        <title>MoonDiary</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </NextHead>
      <Provider store={store}>
        <GlobalStyle />
        <NextTopLoader
          color="#b101b1"
          height={2}
          showSpinner={false}
          crawl={true}
          crawlSpeed={200}
          initialPosition={0.2}
          easing="ease-in-out"
          speed={500}
          shadow="0 0 10px #b101b1"
          zIndex={1600}
          showAtBottom={false}
        />
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  )
}