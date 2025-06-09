import { NextApiRequest, NextApiResponse } from "next";
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from "@/models/Tags.model";
import { HttpMethod } from "@/helpers/apiHelpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, filterId } = req.query;

    switch (req.method) {
        case HttpMethod.GET:
            try {
                const tag = await TagsModel.findById(id);
                if (!tag) return res.status(404).json({ error: "Tag not found" });

                const blogIds = tag.blogIds.filter(
                    (bid: string) => bid.toString() !== filterId
                );

                const blogs = await BlogsModel.find({
                    _id: { $in: blogIds },
                    isDraft: { $ne: true },
                })
                    .sort({ updatedAt: -1 })
                    .populate("tags", "name");

                return res.status(200).json(blogs);
            } catch (err) {
                return res.status(500).json(err);
            }

        default:
            return res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDB(handler);