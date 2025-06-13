import Base from "@/containers/Base/Base";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import styled from "styled-components";
import Head from "next/head";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";

export const Container = styled.div`
  min-height: calc(100dvh);
  padding-top: 120px;
`;

export const FeatureHeader = styled.h2`
  font-family: Anton, sans-serif;
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

const TagPage = ({ blogsData }: { blogsData: any }) => {
    console.log(blogsData)
    return (
        <>
            <Head>
                <title>{`#${blogsData.name} | MoonDiary`}</title>
                <meta
                    name="description"
                    content={`Explore blog posts related to #${blogsData.name} on MoonDiary`}
                />
                <meta
                    name="keywords"
                    content={`#${blogsData.name}`}
                />
            </Head>
            <Base>
                <Container>
                    <FeatureHeader>#{blogsData.name}</FeatureHeader>
                    <ArticleGrid blogs={blogsData.blogs} />
                </Container>
            </Base>
        </>
    );
};

export default React.memo(TagPage);

// 🔁 STATIC PATHS
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/tags`);
    const tags = await res.json();

    const paths = tags.map((tag: any) => ({
        params: { id: tag._id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking', // Can also use true or false depending on use case
    };
};

// 🧊 STATIC PROPS
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };

    try {
        const res = await fetch(`${process.env.BASE_URL}/api/tags/${id}`);
        if (!res.ok) throw new Error("Failed to fetch tag");

        const blogsData = await res.json();

        return {
            props: {
                blogsData,
            },
            revalidate: 300,
        };
    } catch (err) {
        console.error("Error fetching tag:", err);
        return { notFound: true };
    }
};