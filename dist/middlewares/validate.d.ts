import { Request, Response, NextFunction } from 'express';
export default function tokenValidation(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
