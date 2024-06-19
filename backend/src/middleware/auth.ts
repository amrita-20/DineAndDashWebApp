import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import {auth} from 'express-oauth2-jwt-bearer';
import jwt from 'jsonwebtoken';
import User from '../models/user';

declare global {
    namespace Express {
      interface Request {
        userId: string;
        auth0Id: string;
      }
    }
  }

  type UserType = {
    _id: mongoose.Types.ObjectId,
    auth0Id: string,
    email: string,
    name: string,
    phone: number,
    addresses: []
  } 

export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
  });

  export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if(!authorization || !authorization.startsWith('Bearer ')){
        return res.sendStatus(401);
    }

    const authToken = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(authToken) as jwt.JwtPayload;
        const auth0Id = decoded.sub;
        const user : UserType | null = await User.findOne({ auth0Id }) as UserType | null;

        if(!user){
            return res.sendStatus(401);
        }
        req.auth0Id = auth0Id as string;
        req.userId= (user._id).toString();
        console.log("req", req);
        next();
    }
    catch(error) {
        return res.sendStatus(401);
    }
  }