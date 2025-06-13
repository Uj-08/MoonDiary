import mongoose, { Schema, Document, Model } from "mongoose";
import { BlogType } from "@/types/blog";

// Extend BlogType with Document to ensure _id, createdAt, updatedAt are included
interface BlogDocument extends BlogType, Document { }

const BlogSchema: Schema<BlogDocument> = new Schema(
    {
        blogTitle: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true, index: true },
        blogImg: {
            type: String,
            validate: {
                validator: function (this: BlogDocument, value: string) {
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
                validator: function (this: BlogDocument, value: any[]) {
                    if (!this.isDraft) {
                        return Array.isArray(value) && value.length > 0;
                    }
                    return true;
                },
                message: "At least one tag is required when publishing.",
            },
        },
        blogData: {
            type: String,
            validate: {
                validator: function (this: BlogDocument, value: string) {
                    if (!this.isDraft) {
                        return value.trim().length > 0;
                    }
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
                validator: function (value: string) {
                    return ["psykidbiz@gmail.com", "ujjwalpandey24@gmail.com"].includes(value);
                },
                message: "You are not authorized to post.",
            },
        },
        seoDescription: {
            type: String,
            validate: {
                validator: function (this: BlogDocument, value: string) {
                    if (!this.isDraft) {
                        return value.trim().length > 0;
                    }
                    return true;
                },
                message: "SEO description can't be empty when publishing.",
            },
        },
        isDraft: { type: Boolean, required: true },
    },
    { timestamps: true }
);

// Fix model declaration to avoid overwrite issues in dev
const BlogModel: Model<BlogDocument> =
    mongoose.models.Blog || mongoose.model<BlogDocument>("Blog", BlogSchema);

export default BlogModel;