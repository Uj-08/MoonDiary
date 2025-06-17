import React, { useContext, useState } from "react";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { GetServerSideProps } from "next";
import { getCookie, hasCookie } from "cookies-next";
import { ADMIN_EMAILS, COOKIE_NAME } from "@/helpers/constants";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import ProfileHero from "@/components/HeroSection/ProfileHero";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";
import styled from "styled-components";
import { ClientContext } from "@/containers/Base/Base";

export const ToggleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
`;

export const SwitchContainer = styled.div`
    background-color: #e0e0e0;
    border-radius: 50px;
    display: flex;
    padding: 4px;
    position: relative;
`;

export const SwitchOption = styled.button<{ active: boolean }>`
    background-color: ${({ active }) => (active ? "#b101b1" : "transparent")};
    color: ${({ active }) => (active ? "#fff" : "#333")};
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: "Arimo",sans-serif;

    &:hover {
        background-color: ${({ active }) => (active ? "#b101b1" : "#ddd")};
    }
`;

const Profile = ({ blogsArray, sessionId }: { blogsArray: PopulatedBlogType[], sessionId: string }) => {
    const client = useContext(ClientContext)
    const [blogsArrayState, setBlogsArrayState] = useState(blogsArray)
    const dispatch = useDispatch();
    const router = useRouter();
    const [showDrafts, setShowDrafts] = useState(true);
    const showDraftsHandler = (showDrafts: boolean) => {
        return async () => {
            let fetchedBlogsArray: PopulatedBlogType[] | [] = [];
            dispatch(updateBlogDataIsLoading(true))
            try {
                const apiRes = await fetch(
                    `/api/blogs?showDrafts=${showDrafts}`,
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
                    setBlogsArrayState(fetchedBlogsArray);
                    setShowDrafts(showDrafts);
                    router.push({
                        query: {
                            showDrafts
                        }
                    }, undefined, { shallow: true })
                }
            } catch (e) {
                console.log(e)
            } finally {
                dispatch(updateBlogDataIsLoading(false));
            }
        }
    }

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
                            <SwitchContainer>
                                <SwitchOption active={!showDrafts} onClick={showDraftsHandler(false)}>
                                    Show Published
                                </SwitchOption>
                                <SwitchOption active={showDrafts} onClick={showDraftsHandler(true)}>
                                    Show Drafts
                                </SwitchOption>
                            </SwitchContainer>
                        </ToggleWrapper>
                        <ArticleGrid blogsArray={blogsArrayState} apiPath="blogs/" />
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

        const { sort = "updatedAt", order = "-1", showDrafts = "true" } = query;

        // Add fetch timeout using AbortController
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 7000); // 7s timeout

        const apiRes = await fetch(
            `${process.env.BASE_URL}/api/blogs?sort=${sort}&order=${order}&showDrafts=${showDrafts}`,
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
