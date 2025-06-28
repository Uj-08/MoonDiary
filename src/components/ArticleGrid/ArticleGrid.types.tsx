import { PopulatedBlogType } from "@/types/blog";

export interface ArticleGridTypes {
	blogsArray: PopulatedBlogType[];
	showSortingOptions?: boolean;
	API_INSTANCE: URL | null;
}
