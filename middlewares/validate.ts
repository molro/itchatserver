import jwt from 'jsonwebtoken';
import {Request, Response, NextFunction} from 'express';
import config from 'config'
const key = config.get<string>('PRIVATEKEY')

export default function tokenValidation (req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error:'Acceso denegado'});
    try {
        const verify = jwt.verify(token, key);
        next();
    } catch (err) {
        res.status(400).json({error:'Token no válido'})
    }
}

