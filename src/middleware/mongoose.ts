import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

const connectDB =
  (handler: (arg0: any, arg1: any) => any) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (mongoose.connections[0].readyState) {
      return handler(req, res);
    }
    try {
      await mongoose.connect(process.env.DB as string);
      return handler(req, res);
    } catch (err) {
      return console.log("connection error", err);
    }
  };

export default connectDB;
