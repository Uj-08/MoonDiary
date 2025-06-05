import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/middleware/mongoose';
import TagsModel from '@/models/Tags.model';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const search = req.query.search as string;

            if (!search || search.trim() === "") {
                return res.status(400).json({ error: "Search query is required." });
            }

            const tags = await TagsModel.find({
                name: new RegExp(search, "i"),
            }).limit(3);

            res.status(200).json({ tags });
        } catch (err) {
            console.error("Tag search error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    } else if (req.method === "POST") {
        const body = req.body;
        let newTag = new TagsModel({
            name: body.blogTitle,
            blogIds: [body.blogId],
        });
        try {
            const savedObj = await newTag.save();
            const id = savedObj._id;
            res.status(201).json({ id })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Could not connect to database." })
        }
    } else if (req.method === "PUT") {
        try {
            const body = req.body;
            const blogId = body.blogId;
            const tagId = body.tagId;

            const tag = await TagsModel.findById(tagId);
            await TagsModel.findByIdAndUpdate(
                tagId,
                {
                    $set: {
                        blogIds: [...tag.blogIds, blogId]
                    }
                }
            );

            res.status(200).json({ tagId });
        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({ error: err });
        }
    }
}

export default connectDB(handler);