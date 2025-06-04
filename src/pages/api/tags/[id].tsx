import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/middleware/mongoose';
import TagsModel from '@/models/Tags.model';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
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
    }
}

export default connectDB(handler);