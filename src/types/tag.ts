import { BaseMongoDocument } from "./mongo";

export interface TagType extends BaseMongoDocument {
	name: string;
	blogIds: Array<string>;
}

export interface FeaturesTagType extends TagType {
	nonDraftCount: number;
}
