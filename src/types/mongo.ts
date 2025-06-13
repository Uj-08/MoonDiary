import type { ObjectId } from "mongoose";

export interface BaseMongoDocument {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
