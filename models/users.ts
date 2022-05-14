import {Schema, Types, Model, model} from 'mongoose';

interface Rooms {
    _id: Types.ObjectId;
   roomId: string;
}

interface User {
    nickname: string;
    email: string;
    password: string,
    passport: string,
    token: string,
    state: boolean;
    rooms: Rooms;
}

type UserModelType = Model<User>;

const UserModel = model<User, UserModelType>('User', new Schema<User, UserModelType>({

    nickname: {
        type: String,
        required: true
    },
    email :{
        type: String,
        unique: true,
        required: true
    },    
    password :{
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    state:{
        type: Boolean,
        default: true
    },
    rooms:new Schema<Rooms>({
        roomId: String,
    })
}))

export default UserModel;