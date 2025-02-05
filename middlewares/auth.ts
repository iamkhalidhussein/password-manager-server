import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
      interface Request {
        decoded?: any; 
      }
    }
  }

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('here in verifytoken');
    if (!req.headers.authorization) {
        res.status(401).send({ message: 'forbidden access' });
        return
    }

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error: jwt.JsonWebTokenError | null, decoded: any) => {
        if (error) {
            return res.status(401).send({ message: 'forbidden access' });
        }
        req.decoded = decoded;
        next();
    });
};

export { verifyToken };