import React from "react";
import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";

const Home = ({ blogsArray }: { blogsArray: PopulatedBlogType[] }) => {

  return (
    <>
      <Head>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://moondiary.netlify.app/" />
      </Head>
      <HeroSection />
      <ArticleGrid blogsArray={blogsArray} apiPath="blogs/" />
    </>
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;

  try {
    // Get session token safely
    let token = "";
    if (hasCookie(COOKIE_NAME, { req, res })) {
      const cookie = await getCookie(COOKIE_NAME, { req, res });
      if (typeof cookie === "string") token = cookie;
    }

    const { sort = "updatedAt", order = "-1" } = query;

    // Add fetch timeout using AbortController
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

    const apiRes = await fetch(
      `${process.env.BASE_URL}/api/blogs?sort=${sort}&order=${order}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token && { "x-session-token": token }),
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);

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
        error:
          error?.name === "AbortError"
            ? "Request timed out. Please try again later."
            : error?.message || "Unknown error occurred",
      },
    };
  }
};
