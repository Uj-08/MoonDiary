import { PopulatedBlogType } from "@/types/blog";

export interface EditorComponentProps {
    readonly sessionId: string;
    readonly blog?: PopulatedBlogType;
}