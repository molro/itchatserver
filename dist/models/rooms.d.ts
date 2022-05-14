import { Types, Model } from "mongoose";
interface Messages {
    _id: Types.ObjectId;
    user: string;
    message: string;
}
interface Users {
    _id: Types.ObjectId;
    user: string;
    state: boolean;
}
interface Rooms {
    _id: Types.ObjectId;
    roomName: String;
    messages: Messages[];
    users: Users[];
}
declare type RoomDocumentProps = {
    messages: Types.DocumentArray<Messages>;
};
declare type RoomModelType = Model<Rooms, {}, RoomDocumentProps>;
declare const RoomModel: RoomModelType;
export default RoomModel;
