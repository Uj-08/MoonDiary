import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import { GetStaticProps } from "next";

const Home = ({ blogsArray }: { blogsArray: PopulatedBlogType[] }) => {

  const filterURL = React.useMemo(() => {
    if (typeof window === "undefined") return null;
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
    const resData = await fetch(`${process.env.BASE_URL}/api/blogs`);

    if (!resData.ok) {
      return {
        redirect: {
          permanent: false,
          destination: "/500"
        }
      }
    }

    const blogsArray = await resData.json()

    return {
      props: {
        blogsArray
      },
      revalidate: 5 * 60, // Regenerate every 5 mins
    };
  } catch (error: any) {
    console.error("ISR blog fetch error:", error);
    return {
      redirect: {
        permanent: false,
        destination: "/500"
      }
    }
  }
};