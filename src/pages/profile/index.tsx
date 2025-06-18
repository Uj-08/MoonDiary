import React, { useCallback, useContext, useEffect, useState } from "react";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { ADMIN_EMAILS, COOKIE_NAME } from "@/helpers/constants";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import ProfileHero from "@/components/HeroSection/ProfileHero";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";
import styled from "styled-components";
import { ClientContext } from "@/containers/Base/Base";
import Switch from "@/components/Switch";

const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    width: 100%;
`;

const Profile = ({ blogsArray, sessionId }: { blogsArray: PopulatedBlogType[], sessionId: string }) => {
    const client = useContext(ClientContext)
    const [blogsArrayState, setBlogsArrayState] = useState(blogsArray)
    const dispatch = useDispatch();
    const [showDrafts, setShowDrafts] = useState(false);

    const filterURL = React.useMemo(() => {
        if (typeof window === "undefined") return null;
        const url = new URL("/api/blogs", window.location.origin);
        url.searchParams.set("showDrafts", String(showDrafts));
        return url;
    }, [showDrafts]);

    const showDraftsHandler = useCallback(async (showDrafts: boolean) => {
        setShowDrafts(showDrafts);
        let fetchedBlogsArray: PopulatedBlogType[] | [];
        dispatch(updateBlogDataIsLoading(true));
        (filterURL as URL).searchParams.set("showPublished", String(!showDrafts));
        (filterURL as URL).searchParams.set("showDrafts", String(showDrafts));
        try {
            const apiRes = await fetch(
                (filterURL as URL).href,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        ...(sessionId && { "x-session-token": sessionId }),
                    }
                }
            );

            if (apiRes.ok) {
                fetchedBlogsArray = await apiRes.json();
                setBlogsArrayState(fetchedBlogsArray)
            }
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(updateBlogDataIsLoading(false));
        }
    }, [dispatch, filterURL, sessionId]);

    return (
        <>
            <Head>
                <meta name="robots" content="index,follow" />
                <link rel="canonical" href="https://moondiary.netlify.app/profile" />
            </Head>
            <ProfileHero />
            {ADMIN_EMAILS.includes(client?.email || "") &&
                (
                    <>
                        <ToggleWrapper>
                            <Switch showDrafts={showDrafts} showDraftsHandler={showDraftsHandler} />
                        </ToggleWrapper>
                        <ArticleGrid blogsArray={blogsArrayState} filterURL={filterURL} />
                    </>
                )
            }
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
