import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
	{
		googleId: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		email_verified: { type: Boolean },
		name: String,
		given_name: String,
		family_name: String,
		picture: String,
	},
	{ timestamps: true }
);

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
