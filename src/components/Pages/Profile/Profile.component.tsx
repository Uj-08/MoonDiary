import React, { useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateBlogDataIsLoading } from "@/redux/slices/blogInfo";
import { Container, ProfileTitle, ToggleWrapper } from "./Profile.styles";
import { PopulatedBlogType } from "@/types/blog";
import { ProfilePageTypes } from "./Profile.types";
import ProfileHero from "@/components/HeroSection/ProfileHero/ProfileHero.component";
import SwitchComponent from "@/components/Switch/Switch.component";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import { Option } from "@/components/Switch/Switch.types";

const Profile = ({ blogsArray, isAdmin }: ProfilePageTypes) => {
	const dispatch = useDispatch();
	const [blogsArrayState, setBlogsArrayState] = useState(blogsArray);
	const [selectedView, setSelectedView] = useState<Option>(isAdmin ? "published" : "liked");

	const API_INSTANCE = useMemo(() => {
		if (typeof window === "undefined") return null;
		const url = new URL("/api/blogs", window.location.origin);
		url.searchParams.set("fetchLiked", String(!isAdmin));
		url.searchParams.set("showPublished", String(isAdmin));
		url.searchParams.set("showDrafts", String(isAdmin));
		return url;
	}, [isAdmin]);

	const showDraftsHandler = useCallback(
		async (switchValue: Option) => {
			dispatch(updateBlogDataIsLoading(true));
			let fetchedBlogsArray: PopulatedBlogType[] | [];
			try {
				switch (switchValue) {
					case "drafts":
						(API_INSTANCE as URL).searchParams.set("showPublished", String(false));
						(API_INSTANCE as URL).searchParams.set("showDrafts", String(true));
						(API_INSTANCE as URL).searchParams.set("fetchLiked", String(false));
						break;
					case "published":
						(API_INSTANCE as URL).searchParams.set("showPublished", String(true));
						(API_INSTANCE as URL).searchParams.set("showDrafts", String(false));
						(API_INSTANCE as URL).searchParams.set("fetchLiked", String(false));
						break;
					case "liked":
						(API_INSTANCE as URL).searchParams.set("showPublished", String(false));
						(API_INSTANCE as URL).searchParams.set("showDrafts", String(false));
						(API_INSTANCE as URL).searchParams.set("fetchLiked", String(true));
						break;
					default:
						throw Error("Does not exist");
				}
				const apiRes = await fetch(API_INSTANCE as URL);
				if (apiRes.ok) {
					fetchedBlogsArray = await apiRes.json();
					setBlogsArrayState(fetchedBlogsArray);
					setSelectedView(switchValue);
					dispatch(updateBlogDataIsLoading(false));
				}
			} catch (err) {
				console.log(err);
			}
		},
		[dispatch, API_INSTANCE]
	);
	return (
		<Container>
			<ProfileHero />
			{isAdmin ? (
				<ToggleWrapper>
					<SwitchComponent selected={selectedView} onChange={showDraftsHandler} />
				</ToggleWrapper>
			) : (
				<ProfileTitle>Posts liked by you.</ProfileTitle>
			)}
			<ArticleGrid
				showSortingOptions={selectedView !== "liked"}
				blogsArray={blogsArrayState}
				API_INSTANCE={API_INSTANCE}
			/>
		</Container>
	);
};

export default React.memo(Profile);
