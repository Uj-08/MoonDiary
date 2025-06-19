import React from "react";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import { GetStaticProps } from "next";
import dbConnect from "@/lib/dbConnect";
import BlogsModel from "@/models/Blogs.model";
import HomeComponent from "@/components/Pages/Home/Home.component";

const Home = ({ blogsArray }: { blogsArray: PopulatedBlogType[] }) => {

  return (
    <>
      <Head>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_BASE_URL} />
      </Head>
      <HomeComponent blogsArray={blogsArray} />
    </>
  );
};

export default Home;

// ⏱ ISR with direct DB call
export const getStaticProps: GetStaticProps = async () => {
  try {
    await dbConnect();

    // Ensure Tags model is registered
    await import('@/models/Tags.model');

    // Only show published blogs (isDraft !== true)
    const blogs = await BlogsModel.find({ isDraft: { $ne: true } })
      .populate("tags", "name")
      .sort({ updatedAt: -1 }) // Default sort
      .lean();

    return {
      props: {
        blogsArray: JSON.parse(JSON.stringify(blogs)),
      },
      revalidate: 5 * 60, // Regenerate every 5 mins
    };
  } catch (error: any) {
    console.error("ISR blog fetch error:", error);
    return {
      props: {
        blogsArray: [],
        error: error?.message ?? "Blog fetch failed",
      },
      revalidate: 60,
    };
  }
};