import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import { FeaturesTagType } from "@/types/tag";
import FeaturesComponent from "@/components/Pages/Features/Features.component";

const Features = ({ tags }: { tags: FeaturesTagType[] }) => {

    // SEO
    const keywords = tags.map(tag => tag.name).join(", ");
    return (
        <>
            <Head>
                <title>Features | MoonDiary</title>
                <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/features`} />
                <meta name="robots" content="index,follow" />
                <meta
                    name="description"
                    content={`Explore blogs by #tags on MoonDiary`}
                />
                <meta
                    name="keywords"
                    content={keywords}
                />
            </Head>
            <FeaturesComponent tags={tags} />
        </>
    );
}

export default Features;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

    const API_INSTANCE = new URL("/api/tags", process.env.NEXT_PUBLIC_BASE_URL)

    const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res });
    if (isSessionAvailable) {
    }
    try {
        const apiRes = await fetch(API_INSTANCE, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                //   'x-session-token': getCookie(COOKIE_NAME, context) as string, 
            },
        });
    
        if(!apiRes.ok) throw new Error(`API error: ${apiRes.status}`);
        
        const tags = await apiRes.json();
    
        return {
            props: {
                tags
            },
        };
    } catch(err) {
        console.log(err);
        return {
            redirect: {
                destination: "/500?origin=/features",
                permanent: false
            }
        }
    }
};
