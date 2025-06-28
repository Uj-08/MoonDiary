import { PopulatedBlogType } from "@/types/blog";

export interface TagPageTypes {
	tagId: string;
	tagName: string;
	blogsArray: PopulatedBlogType[];
}
