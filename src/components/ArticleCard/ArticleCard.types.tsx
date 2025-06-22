import { PopulatedBlogType } from "@/types/blog";

export type ArticleCardTypes = {
	readonly blog: PopulatedBlogType;
	readonly clientEmail?: string;
	readonly index: number;
};
