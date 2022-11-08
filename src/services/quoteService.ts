import NotFoundError from "../middleware/NotFoundError";
import QuoteModel from "../models/quoteModel";
import { sanitizeQuote } from "../sanitizer/quoteSanitizer";
import { sanitizeId } from "../sanitizer/userSanitizer";
import { QuoteType } from "../types/types";
import { ErrorHandler } from "../utils/httpException";


export async function getQuotes(): Promise<QuoteType[]> {
    try {
        const quotes = await QuoteModel.find();

        return quotes;
    } catch (err) {
        throw ErrorHandler(err);
    }
}
export async function getQuotesByUserId(userId:string): Promise<QuoteType[]> {
   
        const quotes = await QuoteModel.find({userId:userId});
        // if (quotes == null) throw new NotFoundError('User not found');
        return quotes;
    
}


export async function createQuote(
    quote: QuoteType,
    userId: string 
): Promise<QuoteType> {
    const sanitizedQuote = sanitizeQuote(quote, userId);
    console.log(sanitizedQuote)

    try {
        const newQuote= await QuoteModel.create(sanitizedQuote);


        return newQuote;
    } catch (err: unknown) {
        throw ErrorHandler(err);
    }
}

// async function isUserAuthorized(
//     userId: string | undefined,
//     quoteId: string
// ): Promise<void> {
//     const sanitizedUserId = sanitizeId(userId);
//     const PokemonToUpdate = await getPokemonById(PokemonId);
//     if (sanitizedUserId !== PokemonToUpdate.userId) {
//         throw new AuthenticationError();
//     }
// }
