import { Schema } from "mongoose";
import { GoogleUserType } from "../types/types";

export interface GUserSchema extends GoogleUserType {
    _id: string;
}

const googleUser = new Schema<GoogleUserType>({
    googleId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
  export default googleUser;