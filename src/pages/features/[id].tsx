import Base from "@/containers/Base/Base";
// import HeroSection from "@/components/HeroSection/HeroSection.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import styled from "styled-components";
import Head from "next/head";
import React from "react";

export const Container = styled.div`
    min-height: calc(100dvh);
    padding: 100px;
    h2 {
        font-family: Anton, sans-serif; 
        letter-spacing: 0.8px;
    }
`

const Home = ({ blogsData }: { blogsData: any }) => {
    console.log(blogsData)
    return (
        <>
            <Head>
                <title>MoonDiary - #{blogsData.name}</title>
                <link rel="preload" as="image" href="/cover.jpeg" />
            </Head>
            <Base>
                <Container>
                    <h2>
                        #{blogsData.name}
                    </h2>
                    <ArticleGrid blogs={blogsData.blogs} />
                </Container>
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

    const { sort = "updatedAt", order = "-1", id } = query;

    const resData = await fetch(`${process.env.BASE_URL}/api/tags/${id}?sort=${sort}&order=${order}`, {
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
