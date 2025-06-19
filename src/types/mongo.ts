export interface BaseMongoDocument {
    _id: string;
    createdAt?: Date;
    updatedAt?: Date;
}