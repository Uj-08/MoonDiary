import { PopulatedBlogType } from "@/types/blog";

export interface ArticleGridTypes {
    blogsArray: PopulatedBlogType[];
    filterURL: URL | null;
}