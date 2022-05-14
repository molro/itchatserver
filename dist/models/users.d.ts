import { Types, Model } from 'mongoose';
interface Rooms {
    _id: Types.ObjectId;
    roomId: string;
}
interface User {
    nickname: string;
    email: string;
    password: string;
    passport: string;
    token: string;
    state: boolean;
    rooms: Rooms;
}
declare type UserModelType = Model<User>;
declare const UserModel: UserModelType;
export default UserModel;
