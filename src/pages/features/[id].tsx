import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import styled from "styled-components";
import Head from "next/head";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import dbConnect from "@/lib/dbConnect";
import TagsModel from "@/models/Tags.model";
import BlogsModel from "@/models/Blogs.model";
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

const TagPage = ({ data }: { data: { blogs: PopulatedBlogType[], name: string } }) => {
    const router = useRouter();
    const { id } = router.query;
    const url = `https://moondiary.netlify.app/features/${id}`
    return (
        <>
            <Head>
                <title>{`#${data.name} | MoonDiary`}</title>
                <link
                    rel="canonical"
                    href={url}
                />
                <meta
                    name="description"
                    content={`Explore blog posts related to #${data.name} on MoonDiary`}
                />
                <meta
                    name="keywords"
                    content={`#${data.name}`}
                />
            </Head>
            <Container>
                <FeatureHeader>#{data.name}</FeatureHeader>
                <ArticleGrid blogsArray={data.blogs} apiPath={`tags/${id}`} />
            </Container>
        </>
    );
};

export default React.memo(TagPage);

// 🔁 STATIC PATHS
export const getStaticPaths: GetStaticPaths = async () => {
    await dbConnect(); // custom helper to connect
    const tags = await TagsModel.find({}).select("_id");

    const paths = tags.map((tag: any) => ({
        params: { id: tag._id.toString() },
    }));

    return {
        paths,
        fallback: 'blocking',
    };
};

// 🧊 STATIC PROPS
export const getStaticProps: GetStaticProps = async ({ params }) => {
    await dbConnect();

    const { id } = params as { id: string };

    try {
        const tag = await TagsModel.findById(id).lean();
        if (!tag) {
            return { notFound: true };
        }

        const blogIds = tag.blogIds.filter((bid: any) => bid.toString() !== "");

        const sort = "updatedAt";
        const order = -1;

        const blogs = await BlogsModel.find({
            _id: { $in: blogIds },
            isDraft: { $ne: true },
        })
            .sort({ [sort]: order })
            .populate("tags", "name")
            .lean();

        const serializedBlogs = JSON.parse(JSON.stringify(blogs));

        return {
            props: {
                data: {
                    blogs: serializedBlogs,
                    name: tag.name,
                },
            },
            revalidate: 300,
        };
    } catch (err) {
        console.error("Error in getStaticProps:", err);
        return { notFound: true };
    }
};