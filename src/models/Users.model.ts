import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
	googleId: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	name: String,
	picture: String,
});

export default mongoose.models.Users || mongoose.model("Users", UserSchema);
