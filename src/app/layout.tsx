// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Arimo } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Base from '@/containers/Base/BaseApp';
import Providers from './providers';

const arimo = Arimo({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
    title: 'MoonDiary – Align Your Life Through Energy Medicine & Cosmic Guidance',
    description:
        'Explore daily insight on esoterica and intuitive guidance on MoonDiary — your one stop shop for aligning life with cosmic wisdom.',
    openGraph: {
        title: 'MoonDiary',
        images: '/cover.jpeg',
        siteName: 'MoonDiary',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        creator: '@MoonDiary',
    },
    icons: {
        icon: '/favicon.png',
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {

    return (
        <html lang="en">
            <body className={arimo.className}>
                <NextTopLoader
                    color="#b101b1"
                    height={2}
                    showSpinner={false}
                    crawl
                    crawlSpeed={200}
                    initialPosition={0.2}
                    easing="ease-in-out"
                    speed={500}
                    shadow="0 0 10px #b101b1"
                    zIndex={1600}
                    showAtBottom={false}
                />
                <Providers>
                    <Base>
                        {children}
                    </Base>
                </Providers>
                <div id="modal-portal" />
            </body>
        </html>
    );
}