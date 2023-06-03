import { Request, Response, NextFunction } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { ERROR } from '../utils/message';

interface IPayload {
    sub: string;
}

const Auth = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    if (!authHeader)
        return response.json({ err: true, jwt: true, message: ERROR });

    const [, token] = authHeader.split(' ');
    try {
        const  sub  =  verify(token, String(process.env.JWT_STRING)) as any; 
        
        request.user = JSON.parse(sub.user)

        return next();
    } catch (error) {
        return response.json({ err: true, jwt: true, message: ERROR });
    }
};

export { Auth };