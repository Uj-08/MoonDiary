import { PopulatedBlogType } from "@/types/blog";
import { ClientContextType } from "@/types/client";

export interface AdditionalSectionComponentTypes {
    blog: PopulatedBlogType
    client: ClientContextType | null;
}