import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/middleware/mongoose';
import TagsModel from '@/models/Tags.model';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const search = req.query.search as string;

        if (!search || search.trim() === "") {
            return res.status(400).json({ error: "Search query is required." });
        }

        try {
            const tags = await TagsModel.find({
                name: new RegExp(search, "i"),
            }).limit(3);

            res.status(200).json({ tags });
        } catch (err) {
            console.error("Tag search error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
export default connectDB(handler);