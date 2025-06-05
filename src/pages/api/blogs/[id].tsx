import { NextApiRequest, NextApiResponse } from "next";
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from "@/models/Tags.model";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if (req.method === "GET") {
        try {
            const sendAll = req.query.sendAll === "true";
            let blog = await BlogsModel.findById(id).populate("tags", sendAll ? "" : "name");
            res.status(200).json({ blog })
        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({ error: err })
        }
    }
    else if (req.method === "PUT") {
        try {
            const body = req.body;
            let blog = await BlogsModel.findById(id).populate("tags");
            if (!blog) throw new Error("Blog not found");

            const currentTagIds = (blog.tags as { _id: any }[]).map(tag => tag._id.toString());
            const cleanTags = [...new Set((body.tags as string[]).map(t => t.trim()))];

            const newTagDocs = await Promise.all(cleanTags.map(async name => {
                let tag = await TagsModel.findOne({ name });
                if (!tag) tag = await TagsModel.create({ name });
                return tag;
            }));

            const newTagIds = newTagDocs.map(tag => tag._id.toString());

            Object.assign(blog, body);
            blog.tags = newTagDocs.map(tag => tag._id);

            await blog.save();

            const tagsToRemove = currentTagIds.filter(id => !newTagIds.includes(id));
            const tagsToAdd = newTagIds.filter(id => !currentTagIds.includes(id));

            await TagsModel.updateMany({ _id: { $in: tagsToRemove } }, {
                $pull: { blogIds: blog._id },
            });

            await Promise.all(tagsToAdd.map(tagId =>
                TagsModel.findByIdAndUpdate(tagId, {
                    $addToSet: { blogIds: blog._id },
                })
            ));

            res.status(200).json({ id });
        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({ error: err });
        }
    }
    else if (req.method === "DELETE") {
        try {
            const blog = await BlogsModel.findById(id).populate("tags");
            if (!blog) throw new Error("Not found");

            await Promise.all(
                (blog.tags as { _id: any }[]).map(tag =>
                    TagsModel.findByIdAndUpdate(tag._id, {
                        $pull: { blogIds: blog._id }
                    })
                )
            );

            await BlogsModel.findByIdAndDelete(id);
            res.status(200).json({ id });
        } catch (err) {
            console.log("error: ", err);
            res.status(500).json({ error: err })
        }
    }
}

export default connectDB(handler);