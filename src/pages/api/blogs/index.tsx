import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from '@/models/Tags.model';
import jwtDecode from 'jwt-decode';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const body = req.body;
        try {
            //normalize tags to remove duplication
            const cleanTags: string[] = [
                ...new Set((body.tags as string[]).map((t: string) => t.trim())),
            ];

            //check if tag exists before, if not create one, and return anyway for further operations
            const tagDocs = await Promise.all(cleanTags.map(async name => {
                let tag = await TagsModel.findOne({ name });
                tag ??= await TagsModel.create({ name });
                return tag;
            }));

            //create blog object with tag ids
            let newBlog = new BlogsModel({
                blogTitle: body.blogTitle,
                blogImg: body.blogImg,
                blogData: body.blogData,
                authorName: body.authorName,
                authorPicture: body.authorPicture,
                authorEmail: body.authorEmail,
                isDraft: body.isDraft,
                tags: tagDocs.map(tag => tag._id),
            });

            //add blogIds to the tags
            await Promise.all(tagDocs.map(tag =>
                TagsModel.findByIdAndUpdate(tag._id, {
                    $addToSet: { blogIds: newBlog._id },
                })
            ))

            const savedObj = await newBlog.save();
            const id = savedObj._id;
            res.status(201).json({ id })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Could not connect to database." })
        }
    }

    else if (req.method === "GET") {
        try {
            const sessionToken = req.headers['x-session-token'];
            let clientEmail = null;

            if (sessionToken) {
                try {
                    const decoded: any = jwtDecode(sessionToken as string);
                    clientEmail = decoded?.email;
                } catch (e) {
                    // invalid token, log if you want
                    clientEmail = null;
                }
            }

            const query = clientEmail
                ? {
                    $or: [
                        { isDraft: { $ne: true } },
                        { authorEmail: clientEmail }
                    ]
                }
                : { isDraft: { $ne: true } };

            let blogs = await BlogsModel.find(query)
                .populate("tags", "name")
                .sort({ updatedAt: -1 });

            res.status(200).json({ blogs });
        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({ error: err });
        }
    }
}

export default connectDB(handler);