import { Request, Response } from 'express';
export declare const loginPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const logOut: (req: Request, res: Response) => Promise<void>;
