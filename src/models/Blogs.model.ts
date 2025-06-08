import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        blogTitle: { type: String, required: true },
        blogImg: {
            type: String,
            validate: {
                validator: function (value: string) {
                    if (!this.isDraft) {
                        return /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp)$/i.test(value);
                    }
                    return true;
                },
                message: "Image can't be empty or unsupported when publishing.",
            }
        },
        tags: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags", required: true }],
            validate: {
                validator: function (value: any[]) {
                    if (!this.isDraft) {
                        return Array.isArray(value) && value.length > 0;
                    }
                    return true;
                },
                message: "At least one tag is required when publishing.",
            },
        },
        blogData: {
            type: String, validate: {
                validator: function (value: string) {
                    if (!this.isDraft) {
                        return value !== "<p>Type here...</p>";
                    }
                    return true;
                },
                message: "Body can't be empty when publishing.",
            }
        },
        authorName: { type: String, required: true },
        authorPicture: { type: String, required: true },
        authorEmail: { type: String, required: true },
        isDraft: { type: Boolean, required: true }
    },
    { timestamps: true }
);

export default mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);