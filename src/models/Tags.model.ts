import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TagsSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        blogIds: [
            {
                type: Schema.Types.ObjectId,
                ref: "blogs",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.models.Tags || mongoose.model("Tags", TagsSchema);
