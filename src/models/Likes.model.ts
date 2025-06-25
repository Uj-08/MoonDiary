import mongoose, { Schema, Document, Types } from "mongoose";

export interface LikeDocument extends Document {
	userId: Types.ObjectId;
	blogId: Types.ObjectId;
	createdAt: Date;
}

const LikeSchema = new Schema<LikeDocument>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
		blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
	},
	{ timestamps: true }
);

// Ensure a user can like a blog only once
// It creates a unique compound index in MongoDB on the combination of userId and blogId
LikeSchema.index({ userId: 1, blogId: 1 }, { unique: true });

export default mongoose.models.Like || mongoose.model<LikeDocument>("Like", LikeSchema);
