import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import FeatureCard from "@/components/FeatureCard";
import styled from "styled-components";
import { FeaturesTagType } from "@/types/tag";

export const Container = styled.div`
    display: flex;
    min-height: calc(100dvh - 120px);
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    margin-bottom: -100px;
    padding-bottom: 30px;
`;

export const Grid = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
`;

const Features = ({ tags }: { tags: FeaturesTagType[] }) => {

    // SEO
    const keywords = tags.map(tag => tag.name).join(", ");
    return (
        <>
            <Head>
                <title>Features | MoonDiary</title>
                <meta
                    name="description"
                    content={`Explore blogs by #tags on MoonDiary`}
                />
                <meta
                    name="keywords"
                    content={keywords}
                />
            </Head>
            <Container>
                <Grid>
                    {
                        tags.map((tag, index) => <FeatureCard key={index} tag={tag} />)
                    }
                </Grid>
            </Container>
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
            //   'x-session-token': getCookie(COOKIE_NAME, context) as string, 
        },
    });
    const tags = await resData.json();

    return {
        props: {
            tags
        },
    };
};
