import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

import {
	TagsContainer,
	AdditionalSection,
	AdditionalData,
	BlogTag,
} from "./AdditionalSection.styles";
import { AdditionalSectionComponentTypes } from "./AdditionalSection.types";
import SkeletalCard from "@/components/ArticleCard/SkeletalCard";
import ArticleCard from "@/components/ArticleCard/ArticleCard.component";
import { PopulatedBlogType } from "@/types/blog";
import { fetchRelatedBlogs } from "../helpers/fetchRelatedBlogs";
import { ADDITIONAL_CARDS_LENGTH } from "@/helpers/constants";

const AdditionalSectionComponent = ({ blog, client }: AdditionalSectionComponentTypes) => {
	const {
		data: cardData = [],
		isLoading,
		isError,
	} = useQuery<PopulatedBlogType[]>({
		queryKey: ["relatedBlogs", blog._id],
		queryFn: () => fetchRelatedBlogs(blog),
		enabled: !!blog?.tags?.length, // Only run if tags exist
		staleTime: 5 * 60 * 1000, // 5 min
	});

	return (
		<AdditionalSection>
			<TagsContainer>
				{blog.tags.map((tag) => (
					<Link key={tag._id.toString()} href={`/features/${tag._id}`}>
						<BlogTag>{`#${tag.name}`}</BlogTag>
					</Link>
				))}
			</TagsContainer>

			<AdditionalData>
				{isError || isLoading || cardData.length === 0
					? Array.from({ length: ADDITIONAL_CARDS_LENGTH }).map((_, index) => (
							<SkeletalCard key={index} />
						))
					: cardData.map((relatedBlog: any, idx: number) => (
							<ArticleCard
								key={relatedBlog._id}
								index={idx}
								blog={relatedBlog}
								clientEmail={client?.email}
							/>
						))}
			</AdditionalData>
		</AdditionalSection>
	);
};

export default React.memo(AdditionalSectionComponent);
