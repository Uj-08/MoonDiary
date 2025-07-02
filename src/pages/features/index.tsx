import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { FeaturesTagType } from "@/types/tag";
import FeaturesComponent from "@/components/Pages/Features/Features.component";

const Features = ({ tags }: { tags: FeaturesTagType[] }) => {
	// SEO
	const keywords = tags.map((tag) => tag.name).join(", ");
	return (
		<>
			<Head>
				<title>Features | MoonDiary</title>
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/features`} />
				<meta name="robots" content="index,follow" />
				<meta name="description" content={`Explore blogs by #tags on MoonDiary`} />
				<meta name="keywords" content={keywords} />
			</Head>
			<FeaturesComponent tags={tags} />
		</>
	);
};

export default Features;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const API_INSTANCE = new URL("/api/tags", process.env.NEXT_PUBLIC_BASE_URL);
	try {
		const apiRes = await fetch(API_INSTANCE);

		if (!apiRes.ok) throw new Error(`API error: ${apiRes.status}`);

		const tags = await apiRes.json();

		return {
			props: {
				tags,
			},
		};
	} catch (err) {
		console.log(err);
		return {
			redirect: {
				destination: "/500?origin=/features",
				permanent: false,
			},
		};
	}
};
