import { Schema } from 'mongoose';
import { QuoteType } from '../types/types';

export interface IQuoteSchema extends QuoteType {
    _id: string;
}

const quoteSchema = new Schema<QuoteType>(
    {
        userId: { type: String, required: true },
        author:{type:String,required:true},
        content: {
            type: String,
            required: true,
            unique: true,
        },
        tags:[{type:String, required:true , trim:true}]
    },
    {
        timestamps: true,
    }
);

export default quoteSchema;
