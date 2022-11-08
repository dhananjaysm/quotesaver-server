import { model } from 'mongoose';
import quoteSchema, { IQuoteSchema } from '../schema/quoteSchema';

const QuoteModel = model<IQuoteSchema>('Quote', quoteSchema);

export default QuoteModel;
