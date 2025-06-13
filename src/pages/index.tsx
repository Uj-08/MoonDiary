import Base from "@/containers/Base/Base";
import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import Head from "next/head";
import React from "react";
import { BlogType } from "@/types/blog";

const Home = ({ blogsArray }: { blogsArray: BlogType[] }) => {
  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/cover.jpeg" />
        <meta name="robots" content="index,follow" />
      </Head>
      <Base>
        <HeroSection />
        <ArticleGrid blogsArray={blogsArray} />
      </Base>
    </>
  );
}

export default React.memo(Home);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res, query } = context;

  const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res });
  if (isSessionAvailable) {
  }

  const { sort = "updatedAt", order = "-1" } = query;

  const resData = await fetch(`${process.env.BASE_URL}/api/blogs?sort=${sort}&order=${order}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-session-token': getCookie(COOKIE_NAME, context) as string,
    },
  });
  const blogsArray = await resData.json();

  return {
    props: {
      blogsArray,
    },
  };
};
