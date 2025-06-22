import { PopulatedBlogType } from "@/types/blog";
import { ClientType } from "@/types/client";
export interface AdditionalSectionComponentTypes {
	blog: PopulatedBlogType;
	client: ClientType | null | undefined;
}
