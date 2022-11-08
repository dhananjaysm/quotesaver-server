import { checkIsValidObjectId } from "../database/db";
import HttpException from "../utils/httpException";

export function sanitizeId(id: string): string {
    if (id === undefined) {
        throw new HttpException('UserId is undefined', 400);
    }
    checkIsValidObjectId(id);
    return id.valueOf(); // "ObjectId('idstring')"
}
