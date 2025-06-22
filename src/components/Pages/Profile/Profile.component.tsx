import React, { useCallback, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";
import { Container, ToggleWrapper } from "./Profile.styles";
import { PopulatedBlogType } from "@/types/blog";
import { ProfilePageTypes } from "./Profile.types";
import { BaseContext, BaseContextType } from "@/containers/Base/Base";
import ProfileHero from "@/components/HeroSection/ProfileHero/ProfileHero.component";
import SwitchComponent from "@/components/Switch/Switch.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { ADMIN_EMAILS } from "@/helpers/constants";

const Profile = ({ sessionId, blogsArray }: ProfilePageTypes) => {
	const dispatch = useDispatch();
	const context = useContext<BaseContextType | null>(BaseContext);
	const [showDrafts, setShowDrafts] = useState(false);
	const [blogsArrayState, setBlogsArrayState] = useState(blogsArray);

	const API_INSTANCE = useMemo(() => {
		if (typeof window === "undefined") return null;
		const url = new URL("/api/blogs", window.location.origin);
		url.searchParams.set("showDrafts", String(showDrafts));
		return url;
	}, [showDrafts]);

	const showDraftsHandler = useCallback(
		async (showDraftsVal: boolean) => {
			if (showDrafts === showDraftsVal) return;
			setShowDrafts(showDraftsVal);
			let fetchedBlogsArray: PopulatedBlogType[] | [];
			dispatch(updateBlogDataIsLoading(true));
			(API_INSTANCE as URL).searchParams.set("showPublished", String(!showDraftsVal));
			(API_INSTANCE as URL).searchParams.set("showDrafts", String(showDraftsVal));
			try {
				const apiRes = await fetch((API_INSTANCE as URL).href, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						...(sessionId && { "x-session-token": sessionId }),
					},
				});

				if (apiRes.ok) {
					fetchedBlogsArray = await apiRes.json();
					setBlogsArrayState(fetchedBlogsArray);
				}
			} catch (e) {
				console.log(e);
			} finally {
				dispatch(updateBlogDataIsLoading(false));
			}
		},
		[dispatch, API_INSTANCE, sessionId, showDrafts]
	);
	return (
		<Container>
			<ProfileHero />
			{ADMIN_EMAILS.includes(context?.client?.email ?? "") && (
				<>
					<ToggleWrapper>
						<SwitchComponent showDrafts={showDrafts} showDraftsHandler={showDraftsHandler} />
					</ToggleWrapper>
					<ArticleGrid blogsArray={blogsArrayState} API_INSTANCE={API_INSTANCE} />
				</>
			)}
		</Container>
	);
};

export default React.memo(Profile);
