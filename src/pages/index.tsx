import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import Head from "next/head";
import React from "react";
import { PopulatedBlogType } from "@/types/blog";

const Home = ({ blogsArray }: { blogsArray: PopulatedBlogType[] }) => {
  return (
    <>
      <Head>
        <meta name="robots" content="index,follow" />
      </Head>
      <HeroSection />
      <ArticleGrid blogsArray={blogsArray} apiPath="blogs/" />
    </>
  );
}

export default React.memo(Home);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;

  try {
    const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res });
    const token = getCookie(COOKIE_NAME, context) as string;

    const { sort = "updatedAt", order = "-1" } = query;

    const apiRes = await fetch(`${process.env.BASE_URL}/api/blogs?sort=${sort}&order=${order}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-session-token": isSessionAvailable ? token : "",
      },
    });

    if (!apiRes.ok) {
      return {
        props: {
          blogsArray: [],
          error: `Failed to fetch blogs. Status: ${apiRes.status}`,
        },
      };
    }

    const blogsArray: PopulatedBlogType[] = await apiRes.json();

    return {
      props: {
        blogsArray,
      },
    };
  } catch (error: any) {
    return {
      props: {
        blogsArray: [],
        error: error?.message || "Unknown error occurred",
      },
    };
  }
};
