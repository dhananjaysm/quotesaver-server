import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import {GoogleUserType, QuoteType, UserReturnType} from '../types/types'
// import { AuthorizedUserRequest } from '../models/authMiddleware';
import { createQuote, getQuotes, getQuotesByUserId } from '../services/quoteService';
import GoogleModel from '../models/googleModel';

export interface AuthorizedUserRequest extends Request {
    user?: UserReturnType 
}

// @desc Get all projects
// @route GET /api/projects
// @access Public
export const getQuotesHandler = asyncHandler(
    async (req: Request, res: Response) => {
        // const user = GoogleModel.findById
        const quotes = await getQuotes();
        console.log(req.user)

        res.status(200).json(quotes);
    }
);

export async function getQuotesByIdHandler (
    req:AuthorizedUserRequest,res:Response){
        
        // const user = GoogleModel.findById(req.user?.googleId)
        console.log(req.user)
        if(req.user){
            const quotes = await getQuotesByUserId(req.user?.googleId);
    
            res.status(200).json(quotes);
        }
        else {
           res.send("Nothing Saved")
        }
    }
// @desc Create a new project
// @route POST /api/projects
// @access Private
export async function createQuoteHandler(
    req: AuthorizedUserRequest,
    res: Response
): Promise<void> {

        // console.log(req.user)
        if(req.user){

            const createdQuote = await createQuote(req.body, req.user?.googleId);
            res.status(201).json(createdQuote);
        
        }
        else {
            res.send("Error: User id not found")
        }
        // console.log(req.body)   
        // res.status(200)
    }


// @desc Get a project by id
// @route GET /api/projects/:id
// // @access Public
// export const getProjectHandler = asyncHandler(
//     async (req: Request, res: Response) => {
//         const project = await getProjectById(req.params.id);

//         res.status(200).json(project);
//     }
// );

// // @desc Delete a project by id
// // @route DELETE /api/projects/:id
// // @access Private


// // @desc Update a project by id
// // @route PUT /api/projects/:id
// // @access Private
// export const updateProjectHandler = asyncHandler(
//     async (req: AuthorizedUserRequest, res: Response) => {
//         const project = await updateProject(
//             req.params.id,
//             req.body,
//             req.user?._id
//         );

//         res.json(project);
//     }
// );
