import React, { useCallback, useContext, useMemo, useState } from 'react'
import { ADMIN_EMAILS } from '@/helpers/constants'
import { Container, ToggleWrapper } from './Profile.styles'
import ProfileHero from '@/components/HeroSection/ProfileHero/ProfileHero.component'
import SwitchComponent from '@/components/Switch/Switch.component'
import { BaseContext, BaseContextType } from '@/containers/Base/Base'
import { PopulatedBlogType } from '@/types/blog'
import { updateBlogDataIsLoading } from '@/redux/slices/blogInfo'
import { useDispatch } from 'react-redux'
import { ProfilePageTypes } from './Profile.types'
import ArticleGrid from '@/components/ArticleGrid/ArticleGrid.component'

const Profile = ({ sessionId, blogsArray }: ProfilePageTypes) => {
    const dispatch = useDispatch();
    const context = useContext<BaseContextType | null>(BaseContext)
    const [showDrafts, setShowDrafts] = useState(false);
    const [blogsArrayState, setBlogsArrayState] = useState(blogsArray)


    const filterURL = useMemo(() => {
        if (typeof window === "undefined") return null;
        const url = new URL("/api/blogs", window.location.origin);
        url.searchParams.set("showDrafts", String(showDrafts));
        return url;
    }, [showDrafts]);

    const showDraftsHandler = useCallback(async (showDraftsVal: boolean) => {
        if (showDrafts === showDraftsVal) return;
        setShowDrafts(showDraftsVal);
        let fetchedBlogsArray: PopulatedBlogType[] | [];
        dispatch(updateBlogDataIsLoading(true));
        (filterURL as URL).searchParams.set("showPublished", String(!showDraftsVal));
        (filterURL as URL).searchParams.set("showDrafts", String(showDraftsVal));
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
    }, [dispatch, filterURL, sessionId, showDrafts]);
    return (
        <Container>
            <ProfileHero />
            {
                ADMIN_EMAILS.includes(context?.client?.email ?? "") &&
                (
                    <>
                        <ToggleWrapper>
                            <SwitchComponent showDrafts={showDrafts} showDraftsHandler={showDraftsHandler} />
                        </ToggleWrapper>
                        <ArticleGrid blogsArray={blogsArrayState} filterURL={filterURL} />
                    </>
                )
            }
        </Container>
    )
}

export default React.memo(Profile);