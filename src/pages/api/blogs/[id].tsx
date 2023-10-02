import { NextApiRequest, NextApiResponse } from "next";
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "GET") {
        const {id} = req.query;
        try {
            let blog = await BlogsModel.findById(id);
            res.status(200).json({ blog })
        } catch(err) {
            console.log("error: ", err);
            res.status(500).json({error: err})
        }
    }
    else if(req.method === "DELETE") {
        const {id} = req.query;
        try {
            await BlogsModel.findByIdAndDelete(id);
            res.status(200).json({ id });
        } catch(err) {
            console.log("error: ", err);
            res.status(500).json({error: err})
        }
    }
} 

export default connectDB(handler);