import { NextApiRequest, NextApiResponse } from "next";
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from "@/models/Tags.model";
import { HttpMethod } from "@/helpers/apiHelpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    switch (req.method) {
        case HttpMethod.GET:
            try {
                const sendAll = req.query.sendAll === "true";
                const blog = await BlogsModel.findById(id).populate("tags", sendAll ? "" : "name").lean();
                return res.status(200).json(blog);
            } catch (err) {
                console.error("GET error:", err);
                return res.status(500).json(err);
            }

        case HttpMethod.PUT:
            try {
                const body = req.body;
                const blog = await BlogsModel.findById(id).populate("tags");
                if (!blog) return res.status(404).json({ error: "Blog not found." });

                // @ts-ignore
                const currentTagIds = (blog.tags).map(tag => tag._id.toString());
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

                await TagsModel.updateMany(
                    { _id: { $in: tagsToRemove } },
                    { $pull: { blogIds: blog._id } }
                );

                await Promise.all(tagsToAdd.map(tagId =>
                    TagsModel.findByIdAndUpdate(tagId, {
                        $addToSet: { blogIds: blog._id }
                    })
                ));

                // Remove tags with no associated blogs
                await TagsModel.deleteMany({ blogIds: { $size: 0 } });

                return res.status(200).json({id});
            } catch (err) {
                return res.status(500).json(err);
            }

        case HttpMethod.DELETE:
            try {
                const blog = await BlogsModel.findById(id).populate("tags");
                if (!blog) return res.status(404).json({ error: "Blog not found." });

                await Promise.all(
                    (blog.tags).map(tag =>
                        // @ts-ignore
                        TagsModel.findByIdAndUpdate(tag._id, {
                            $pull: { blogIds: blog._id }
                        })
                    )
                );

                await BlogsModel.findByIdAndDelete(id);

                // Remove tags with no associated blogs
                await TagsModel.deleteMany({ blogIds: { $size: 0 } });
                
                return res.status(200).json({ id });
            } catch (err) {
                return res.status(500).json(err);
            }

        default:
            return res.status(405).json({ error: "Method Not Allowed" });
    }
}

export default connectDB(handler);