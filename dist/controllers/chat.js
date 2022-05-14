"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesUpd = exports.getRooms = exports.postRooms = exports.getUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const users_1 = __importDefault(require("../models/users"));
const rooms_1 = __importDefault(require("../models/rooms"));
const mongoURI = config_1.default.get('MONGO_URI');
const mongoOpt = config_1.default.get('mongoOpt');
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        const users = yield users_1.default.find({});
        res.json({
            msg: 'Usuarios encontrados',
            users: users
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Petición erronéa',
            type: 'Usuarios no encontrados'
        });
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        // Verificar email
        const user = yield users_1.default.find({});
        res.json({ users: user });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Petición erronéa',
            type: 'Usuario no creado'
        });
    }
});
exports.getUser = getUser;
const postRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRoom = req.body;
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        const rooms = yield rooms_1.default.find({});
        let findRoom = yield rooms_1.default.findOne({ roomName: newRoom.room });
        if (!(findRoom === null || findRoom === void 0 ? void 0 : findRoom.roomName)) {
            const room = new rooms_1.default({
                roomName: newRoom.room,
                roomId: newRoom.id,
                messages: {},
            });
            yield room.save();
            res.json({
                msg: 'Sala Creada',
                rooms: rooms
            });
        }
        else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            const room = new rooms_1.default({
                roomName: repeatedRoom,
                roomId: newRoom.id,
                messages: {},
            });
            yield room.save();
            res.json({
                msg: 'Sala Creada',
                rooms: rooms
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Petición erronéa',
            type: 'Salas no encontradas y/o no existen'
        });
    }
});
exports.postRooms = postRooms;
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        const rooms = yield rooms_1.default.find({});
        res.json({
            msg: 'Salas encontradas',
            rooms: rooms
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Petición erronéa',
            type: 'Salas no encontradas'
        });
    }
});
exports.getRooms = getRooms;
const messagesUpd = (roomId, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        yield rooms_1.default.findOne({ _id: roomId }).updateOne({ $push: { messages: message } });
        const msgs = yield rooms_1.default.findOne({ _id: roomId }, 'messages');
        return msgs;
    }
    catch (error) {
        console.log(error);
    }
});
exports.messagesUpd = messagesUpd;
//# sourceMappingURL=chat.js.map