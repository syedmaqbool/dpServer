// import jwt from "jsonwebtoken";
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

import {createError} from "./error";
import { Request, Response, NextFunction } from 'express';


export const SECRET_KEY: Secret = 'Digitplt';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const verifyToken = (req: Request, res: Response, next: NextFunction)=>{

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if(!token){
        return next(createError(401,"You are not authenticated."))
    }
    jwt.verify(token,SECRET_KEY, (err:any,user:any)=>{
        if(err)
            return next(createError(403,"Token is not valid!."));
        next();
    })

}

