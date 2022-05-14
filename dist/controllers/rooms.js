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
exports.getUsers = exports.leaveRoom = exports.joinRoom = exports.createRooms = exports.readRooms = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const rooms_1 = __importDefault(require("../models/rooms"));
const mongoURI = config_1.default.get('MONGO_URI');
const mongoOpt = config_1.default.get('mongoOpt');
const readRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        let rooms = yield rooms_1.default.find({});
        return rooms;
    }
    catch (error) {
        console.log(error);
    }
});
exports.readRooms = readRooms;
const createRooms = (roomName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        const rooms = yield rooms_1.default.find({});
        const findRoom = yield rooms_1.default.findOne({ roomName: roomName });
        if (!(findRoom === null || findRoom === void 0 ? void 0 : findRoom.roomName)) {
            const room = new rooms_1.default({
                roomName: roomName,
                messages: {},
            });
            yield room.save();
            let newRooms = yield rooms_1.default.find({});
            return newRooms;
        }
        else {
            let repeatedRoom = findRoom.roomName + `${rooms.length + 1}`;
            const room = new rooms_1.default({
                roomName: repeatedRoom,
                messages: {},
            });
            yield room.save();
            let newRooms = yield rooms_1.default.find({});
            return newRooms;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.createRooms = createRooms;
const joinRoom = (roomId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        let findRoom = yield rooms_1.default.findOne({ _id: roomId });
        let findUser = findRoom === null || findRoom === void 0 ? void 0 : findRoom.users.find(e => e.user === user);
        if (!findUser) {
            yield rooms_1.default.findOne({ _id: roomId }).updateOne({ $push: { users: { user: user, state: true } } });
        }
        else {
            return;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.joinRoom = joinRoom;
const leaveRoom = (roomId, user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        let findRoom = yield rooms_1.default.findOne({ _id: roomId });
        let findUser = findRoom === null || findRoom === void 0 ? void 0 : findRoom.users.filter(e => e.user !== user);
        if (findUser) {
            return;
        }
        else {
            return;
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.leaveRoom = leaveRoom;
const getUsers = (roomId) => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect(mongoURI, mongoOpt);
    let findRoom = yield rooms_1.default.findOne({ _id: roomId });
    let users = findRoom === null || findRoom === void 0 ? void 0 : findRoom.users;
    return users;
});
exports.getUsers = getUsers;
//# sourceMappingURL=rooms.js.map