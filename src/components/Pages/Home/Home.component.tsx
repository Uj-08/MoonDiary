import React, { useMemo } from "react";
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component";
import HeroSection from "@/components/HeroSection/HeroSection.component";
import { HomeTypes } from "./Home.types";

const Home = ({ blogsArray }: HomeTypes) => {
	const API_INSTANCE = useMemo(() => {
		if (typeof window === "undefined") return null;
		const url = new URL(`/api/blogs`, window.location.origin);
		return url;
	}, []);
	return (
		<>
			<HeroSection />
			<ArticleGrid blogsArray={blogsArray} API_INSTANCE={API_INSTANCE} />
		</>
	);
};

export default React.memo(Home);
