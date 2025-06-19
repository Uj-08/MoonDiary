import Head from "next/head";
import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import dbConnect from "@/lib/dbConnect";
import TagsModel from "@/models/Tags.model";
import BlogsModel from "@/models/Blogs.model";
import { PopulatedBlogType } from "@/types/blog";
import { useRouter } from "next/router";
import { TagType } from "@/types/tag";
import TagPageComponent from "@/components/Pages/TagPage/TagPage.component";

const TagPage = ({ tagName, blogsArray }: { tagName: string; blogsArray: PopulatedBlogType[] }) => {
    const router = useRouter();

    const { id } = router.query;
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/features/${id}`

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
            <TagPageComponent tagId={id as string} tagName={tagName} blogsArray={blogsArray} />
        </>
    );
};

export default TagPage;

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
        const tag: TagType | null = await TagsModel.findById(id).lean();
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
                tagName: tag.name,
                blogsArray: serializedBlogs,
            },
            revalidate: 300,
        };
    } catch (err) {
        console.error("Error in getStaticProps:", err);
        return { notFound: true };
    }
};