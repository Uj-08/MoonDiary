import { NextApiRequest, NextApiResponse } from "next";
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from "@/models/Tags.model";


async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, filterId } = req.query;
    if (req.method === "GET") {
        try {
            const blogIds = (await TagsModel.findById(id)).blogIds.filter((bid: string) => bid.toString() !== filterId);
            const blogs = await BlogsModel.find({
                _id: { $in: blogIds },
                isDraft: { $ne: true }
            }).sort({ updatedAt: -1 }).populate("tags", "name");
            res.status(200).json(blogs)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
}

export default connectDB(handler);

