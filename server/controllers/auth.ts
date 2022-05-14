import {Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';
import UserModel from '../models/users';

const mongoURI = config.get<string>('MONGO_URI'); 
const key = config.get<string>('PRIVATEKEY')
const mongoOpt = config.get<object>('mongoOpt');

export const loginPost = async (req: Request, res: Response) => {

    const {email, password} = req.body
    try {
        let user 
            await mongoose.connect(mongoURI, mongoOpt);
            user = await UserModel.findOne({email:email})                    
            if (!user) {
                return res.status(200).json({
                    msg:'Usuario y/o Password incorrectos'
                })
            }
 
            const validPass = await bcrypt.compare(password, user.password)
            if(!validPass) {
                return res.status(200).json({
                    msg:'Usuario y/o Password incorrectos'
                })
            }
     
            if(!user.state) {
                return res.status(200).json({
                    msg:'Iniciaste sesión en otro dispositivo!'
                })
            }
  
            const payload = {nickname: user.nickname, email: user.email, passport: user.passport}
            let token = jwt.sign(payload, key)
            res.status(200).json({msg:'Sesión Iniciada', user:user, token: token});
            await UserModel.findOne({email:email}).updateOne({state: false})
            mongoose.connection.close();
         
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }
}

export const logOut = async (req: Request, res: Response) => {
    const { user } = req.body;
    await mongoose.connect(mongoURI, mongoOpt);
    await UserModel.findOne({nickname:user}).updateOne({state: true})
    
    mongoose.connection.close();
    
    res.status(200).json(
        {msg:'Sesión cerrada'}
    )
}