import NotFound from '@/components/Pages/NotFound'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "404 | Page Not Found",
    robots: {
        index: false,
        follow: false,
    },
};

const NotFoundPage = () => {
    return (
        <NotFound />
    )
}

export default NotFoundPage