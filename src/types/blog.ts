import { BaseMongoDocument } from "./mongo";
import { TagType } from "./tag";

/** Shape used when sending to/receiving from MongoDB */
export interface BlogType extends BaseMongoDocument {
    blogTitle: string;
    slug: string;
    blogImg: string;
    blogData: string;
    isDraft: boolean;
    seoDescription: string;
    tags: string[]; // tag ObjectIds as strings
    authorName: string;
    authorPicture: string;
    authorEmail: string;
}

/** Used when tags are populated into full objects */
export interface PopulatedBlogType extends Omit<BlogType, "tags"> {
    tags: TagType[];
}