import { Types } from "mongoose";

export interface BaseMongoDocument {
    _id: string | Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}