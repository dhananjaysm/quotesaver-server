import { QuoteType } from '../types/types';
import HttpException from '../utils/httpException';
import { sanitizeId } from './userSanitizer';

export function sanitizeQuote(
    quote: QuoteType,
    userId: string 
): QuoteType {
    const sanitzedId = sanitizeId(userId);
    const sanitizedQuote: QuoteType = {
        userId: sanitzedId,
        author:quote.author,
        content: '',
        tags:quote.tags
    };

    sanitizedQuote.content = sanitizeContent(quote.content);

    return sanitizedQuote;
}

function sanitizeContent(content: string): string {
    // Types
    if (content === undefined) {
        throw new HttpException('content is undefined', 400);
    }
    if (typeof content !== 'string') {
        throw new HttpException('content is not a string', 400);
    }

    // Attributes
    content = content.trim();
    if (content.length < 3) {
        throw new HttpException('content must be at least 3 characters', 400);
    }
    // if (content.length > 50) {
    //     throw new HttpException('content must be less then 50 characters', 400);
    // }

    return content;
}
