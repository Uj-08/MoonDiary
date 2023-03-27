import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    blogTitle: {type: String, required: true},
    blogImg: {type: String},
    blogData: {type: String, required: true},
    authorName: {type: String, required: true},
    authorPicture: {type: String, required: true},
    authorEmail: {type: String, required: true},
}, {timestamps: true});

export default mongoose.models.Blogs || mongoose.model("Blogs", BlogSchema);