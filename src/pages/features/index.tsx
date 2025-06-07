import React from "react";
import Base from "@/containers/Base/Base";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";

const Features = ({ blogsData }: { blogsData: any }) => {
    return (
        <>
            <Head>
                <title>MoonDiary - Features</title>
                {/* <link rel="preload" as="image" href="/cover.jpeg" /> */}
            </Head>
            <Base>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "75dvh" }}>
                    <h3>
                        Building Features...
                    </h3>
                </div>
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

    //   const resData = await fetch(`${process.env.BASE_URL}/api/blogs`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'x-session-token': getCookie("clientMD", context) as string, 
    //     },
    //   });
    //   const blogsData = await resData.json();

    return {
        props: {
            //   blogsData: blogsData,
        },
    };
};
