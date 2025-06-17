import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import { GetStaticProps } from "next";
import dbConnect from "@/lib/dbConnect";
import BlogsModel from "@/models/Blogs.model";

const Home = ({ blogsArray }: { blogsArray: PopulatedBlogType[] }) => {

  const filterURL = React.useMemo(() => {
    const url = new URL(`/api/blogs`, window.location.origin);
    return url;
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moondiary.netlify.app/" />
      </Head>
      <HeroSection />
      <ArticleGrid blogsArray={blogsArray} filterURL={filterURL} />
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
        error: error?.message || "Blog fetch failed",
      },
      revalidate: 60,
    };
  }
};