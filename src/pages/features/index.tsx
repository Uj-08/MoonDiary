import React from "react";
import Base from "@/containers/Base/Base";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import FeatureCard from "@/components/FeatureCard";
import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    min-height: calc(100dvh - 200px);
    justify-content: center;
    align-items: center;
    padding-top: 80px;
`;

export const Grid = styled.div`
    width: 90%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
`;

const Features = ({ tags }: { tags: any }) => {
    return (
        <>
            <Head>
                <title>Features | MoonDiary</title>
            </Head>
            <Base>
                <Container>
                    <Grid>
                        {
                            tags.map((tag, index) => <FeatureCard key={index} tagData={tag} />)
                        }
                    </Grid>
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
