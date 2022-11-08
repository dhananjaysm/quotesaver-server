import { ObjectId } from "mongoose";

export interface GoogleUserType {
    googleId:string;
    displayName:string;
    // image:string;
    createdAt:Date

}
export interface UserReturnType {
    _id: string;
    googleId: string;
    displayName: string;
    createdAt: Date;
}

export interface QuoteType {
    userId:string;
    author:string;
    content:string;
    tags:Object
}