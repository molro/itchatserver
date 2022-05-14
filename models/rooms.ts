import {Schema, Types, model, Model} from "mongoose";

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
    users: Users[]
}

type RoomDocumentProps = { 
    messages: Types.DocumentArray<Messages>

}

type RoomModelType = Model<Rooms, {}, RoomDocumentProps>;

const RoomModel = model<Rooms, RoomModelType>('Room', new Schema<Rooms, RoomModelType>({
    roomName: String, 
    messages: [new Schema<Messages>({
        user: String,
        message: String,
    })],
    users: [new Schema<Users>({
        user: String,
        state: {
        type: Boolean,
        default: false,
        }
    })]
}))

export default RoomModel;