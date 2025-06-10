import React from "react";
import Base from "@/containers/Base/Base";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import FeatureCard from "@/components/FeatureCard";
import { Container } from "./features.styles";

const Features = ({ tags }: { tags: any }) => {
    console.log(tags)
    return (
        <>
            <Head>
                <title>MoonDiary - Features</title>
                {/* <link rel="preload" as="image" href="/cover.jpeg" /> */}
            </Head>
            <Base>
            <Container>
                {
                    tags.map((tag, index) => <FeatureCard key={index} tagData={tag} />)
                }
            </Container>
            </Base>
        </>
    );
}

export default React.memo(Features);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

    const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res });
    if (isSessionAvailable) {
    }

    const resData = await fetch(`${process.env.BASE_URL}/api/tags`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //   'x-session-token': getCookie("clientMD", context) as string, 
        },
    });
    const tags = await resData.json();

    return {
        props: {
            tags
        },
    };
};
