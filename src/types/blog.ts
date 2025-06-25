import { TagType } from "./tag";

export interface BlogBase {
	blogTitle: string;
	slug: string;
	blogImg: string;
	blogData: string;
	isDraft: boolean;
	views?: number;
	description: string;
	tags: string[]; // tag ObjectIds as strings
	authorName: string;
	authorPicture: string;
	authorEmail: string;
}

export interface BlogType extends BlogBase {
	_id: string; // for client usage
	createdAt: Date;
	updatedAt: Date;
}

export interface PopulatedBlogType extends Omit<BlogType, "tags"> {
	tags: TagType[];
}

export type CreateBlogType = BlogBase;
