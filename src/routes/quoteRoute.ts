import express, { RequestHandler } from "express";
import { createQuoteHandler, getQuotesByIdHandler, getQuotesHandler } from "../controller/quoteController";

const quoteRoute = express.Router()

quoteRoute.route('/')
quoteRoute
.route('/')
.get(getQuotesByIdHandler as RequestHandler)
quoteRoute.route('/quote')
.post(createQuoteHandler as RequestHandler)
export default quoteRoute;