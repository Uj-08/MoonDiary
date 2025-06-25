import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { BlogBase } from "@/types/blog"; // Use base type, not BlogType
import { ADMIN_EMAILS } from "@/helpers/constants";

// Define Mongoose-only Document type
export interface BlogDocument extends Omit<BlogBase, "tags">, Document {
	tags: Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
}

const BlogSchema: Schema<BlogDocument> = new Schema(
	{
		blogTitle: { type: String, required: true, unique: true },
		slug: { type: String, required: true, unique: true, index: true },
		blogImg: {
			type: String,
			validate: {
				validator(this: BlogDocument, value: string) {
					if (!this.isDraft) {
						return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$/i.test(value);
					}
					return true;
				},
				message: "Image can't be empty or unsupported when publishing.",
			},
		},
		tags: {
			type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags", required: true }],
			validate: {
				validator(this: BlogDocument, value: any[]) {
					if (!this.isDraft) return Array.isArray(value) && value.length > 0;
					return true;
				},
				message: "At least one tag is required when publishing.",
			},
		},
		blogData: {
			type: String,
			validate: {
				validator(this: BlogDocument, value: string) {
					if (!this.isDraft) return value.trim().length > 0;
					return true;
				},
				message: "Body can't be empty when publishing.",
			},
		},
		authorName: { type: String, required: true },
		authorPicture: { type: String, required: true },
		authorEmail: {
			type: String,
			required: true,
			validate: {
				validator(value: string) {
					return ADMIN_EMAILS.includes(value);
				},
				message: "You are not authorized to post.",
			},
		},
		description: {
			type: String,
			validate: {
				validator(this: BlogDocument, value: string) {
					if (!this.isDraft) return value.trim().length > 0;
					return true;
				},
				message: "Description can't be empty when publishing.",
			},
		},
		isDraft: { type: Boolean, required: true },
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

// Avoid model overwrite issues
const BlogModel: Model<BlogDocument> =
	mongoose.models.Blog || mongoose.model<BlogDocument>("Blog", BlogSchema);

export default BlogModel;
