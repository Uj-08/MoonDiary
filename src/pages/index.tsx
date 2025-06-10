import Base from "@/containers/Base/Base";
import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import styled from "styled-components";
import Head from "next/head";
import React from "react";

export const Loading = styled.div`
  background-color: white;
  display: flex;
  height: 100dvh;
  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  div {
    position: relative;
    height: 70px;
    width: 70px;
    animation: loadingAnimation 1.5s ease-in-out 0s infinite alternate forwards;
  }

  @keyframes loadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(720deg);
    }
  }
`;

const Home = ({ blogsData }: { blogsData: any }) => {
  return (
    <>
      <Head>
        <title>MoonDiary</title>
        <link rel="preload" as="image" href="/cover.jpeg" />
      </Head>
      <Base>
        <HeroSection />
        <ArticleGrid blogs={blogsData} />
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
      'x-session-token': getCookie("clientMD", context) as string,
    },
  });
  const blogsData = await resData.json();

  return {
    props: {
      blogsData: blogsData,
    },
  };
};
