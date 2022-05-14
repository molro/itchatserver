import { Request, Response} from "express";
import mongoose from "mongoose";
import config from 'config';
import UserModel from "../models/users";
import RoomModel from "../models/rooms";

const mongoURI = config.get<string>('MONGO_URI');
const mongoOpt = config.get<object>('mongoOpt');

export const getUsers: any = async (req: Request, res: Response) => {
  
    try
    {   
        await mongoose.connect(mongoURI, mongoOpt);
        const users = await UserModel.find({}) 
        res.json({
            msg:'Usuarios encontrados',
            users:users
        })
    } 
    catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Usuarios no encontrados'
        })
    }
}

export const getUser: any = async (req: Request, res: Response) => {
    try
    {  
        await mongoose.connect(mongoURI, mongoOpt);
        // Verificar email
        const user = await UserModel.find({}) 
        res.json({users:user})
    }   catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Usuario no creado'
        })
    }
}

export const postRooms: any = async (req: Request, res: Response) => {
    const newRoom = req.body
    try 
    {    
        await mongoose.connect(mongoURI, mongoOpt);
        const rooms = await RoomModel.find({})
        let findRoom = await RoomModel.findOne({roomName: newRoom.room})
        
        if(!findRoom?.roomName) {
            const room = new RoomModel({
                roomName: newRoom.room,
                roomId: newRoom.id,
                messages: {},
            });
            await room.save();
            res.json({  
                msg:'Sala Creada',
                rooms: rooms
            });
        } else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            const room = new RoomModel({
                roomName: repeatedRoom, 
                roomId: newRoom.id,
                messages: {},
            });
            await room.save();
            res.json({  
                msg:'Sala Creada',
                rooms: rooms
            });
        }
    }   catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Salas no encontradas y/o no existen'
        })
    }
}

export const getRooms: any = async (req: Request, res: Response) => {
    try 
    {
        await mongoose.connect(mongoURI, mongoOpt);
        const rooms = await RoomModel.find({}) 
        res.json({
            msg: 'Salas encontradas',
            rooms:rooms
        })

    }   catch (error) {
        console.log(error)
        res.status(400).json({
            msg:'Petición erronéa',
            type: 'Salas no encontradas'
        })
    }
}

export const messagesUpd: any= async (roomId:string, message: object) => {
    try {      
        await mongoose.connect(mongoURI, mongoOpt);
        await RoomModel.findOne({_id: roomId}).updateOne({$push: {messages: message}}); 
        const msgs = await RoomModel.findOne({_id:roomId},'messages');
        return msgs
    }   
    catch (error) {
        console.log(error)
    }
}