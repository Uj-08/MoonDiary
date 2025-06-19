import React from "react";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import ProfileComponent from "@/components/Pages/Profile/Profile.component";

const Profile = ({ blogsArray, sessionId }: { blogsArray: PopulatedBlogType[], sessionId: string }) => {
    return (
        <>
            <Head>
                <meta name="robots" content="index,follow" />
                <link rel="canonical" href="https://moondiary.netlify.app/profile" />
            </Head>
            <ProfileComponent blogsArray={blogsArray} sessionId={sessionId} />
        </>
    );
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;

    let token = "";
    try {
        // Get session token safely
        if (hasCookie(COOKIE_NAME, { req, res })) {
            const cookie = await getCookie(COOKIE_NAME, { req, res });
            if (typeof cookie === "string") token = cookie;
        }

        const { sort = "updatedAt", order = "-1", showDrafts = "false", showPublished = "true" } = query;

        // Add fetch timeout using AbortController
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

        const apiRes = await fetch(
            `${process.env.BASE_URL}/api/blogs?sort=${sort}&order=${order}&showPublished=${showPublished}&showDrafts=${showDrafts}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { "x-session-token": token }),
                },
                signal: controller.signal
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
                sessionId: token,
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
