import { PopulatedBlogType } from "@/types/blog";

export interface ProfilePageTypes { 
    sessionId?: string;
    blogsArray: PopulatedBlogType[];
}