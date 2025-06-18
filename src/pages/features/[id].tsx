import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import styled from "styled-components";
import Head from "next/head";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { PopulatedBlogType } from "@/types/blog";
import { useRouter } from "next/router";
import { anton } from "@/styles/fonts";

export const Container = styled.div`
    min-height: calc(100dvh);
    padding-top: 120px;
`;

export const FeatureHeader = styled.h2`
    font-family: ${anton.style.fontFamily}, sans-serif;
    letter-spacing: 0.8px;
    padding: 1rem 8rem;
    @media (max-width: 1200px) {
        padding: 0 4rem;
    }
    @media (max-width: 812px) {
        padding: 0 2rem;
    }
    @media (max-width: 450px) {
        padding: 0 1rem;
    }
    padding-bottom: 0;
`;

const TagPage = ({ tagName, blogsArray }: { blogsArray: PopulatedBlogType[], tagName: string }) => {
    const router = useRouter();

    const { id } = router.query;
    const url = `https://moondiary.netlify.app/features/${id}`

    const filterURL = React.useMemo(() => {
        if (typeof window === "undefined" || !id) return null;
        return new URL(`/api/tags/${id}`, window.location.origin);
    }, [id]);

    return (
        <>
            <Head>
                <title>{`#${tagName} | MoonDiary`}</title>
                <link
                    rel="canonical"
                    href={url}
                />
                <meta
                    name="description"
                    content={`Explore blog posts related to #${tagName} on MoonDiary`}
                />
                <meta
                    name="keywords"
                    content={`#${tagName}`}
                />
            </Head>
            <Container>
                <FeatureHeader>#{tagName}</FeatureHeader>
                <ArticleGrid blogsArray={blogsArray} filterURL={filterURL} />
            </Container>
        </>
    );
};

export default TagPage;

// STATIC PATHS
export const getStaticPaths: GetStaticPaths = async () => {
    const resData = await fetch(`${process.env.BASE_URL}/api/tags`)

    const tags = await resData.json();

    const paths = tags.map((tag: any) => ({
        params: { id: tag._id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

// STATIC PROPS
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };

    try {
        const resData = await fetch(`${process.env.BASE_URL}/api/tags/${id}`);

        if (!resData.ok) {
            return {
                redirect: {
                    permanent: false,
                    destination: `/500?origin=/features/${id}`
                }
            }
        }

        const blogs = await resData.json();

        return {
            props: blogs,
            revalidate: 300,
        };
    } catch (err) {
        console.error("Error in getStaticProps:", err);
        return { notFound: true };
    }
};