// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Arimo } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import Base from '@/containers/Base/BaseApp';
import Providers from './providers';

const arimo = Arimo({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
    metadataBase: new URL("https://moondiary.netlify.app"),
    title: "MoonDiary",
    description: "Align Your Life Through Energy Medicine & Cosmic Guidance",
    openGraph: {
        title: "MoonDiary",
        description: "Align Your Life Through Energy Medicine & Cosmic Guidance",
        url: "https://moondiary.netlify.app",
        siteName: "MoonDiary",
        images: [
            {
                url: "/cover.jpeg", // This will resolve to: https://moondiary.netlify.app/cover.jpeg
                width: 1200,
                height: 630,
                alt: "MoonDiary Cover",
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "MoonDiary",
        description: "Align Your Life Through Energy Medicine & Cosmic Guidance",
        images: ["/cover.jpeg"],
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