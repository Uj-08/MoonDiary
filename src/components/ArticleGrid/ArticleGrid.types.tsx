import { PopulatedBlogType } from "@/types/blog";

export interface ArticleGridTypes {
    blogsArray: PopulatedBlogType[];
    API_INSTANCE: URL | null;
}