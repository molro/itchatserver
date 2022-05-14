"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserModel = (0, mongoose_1.model)('User', new mongoose_1.Schema({
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
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
    state: {
        type: Boolean,
        default: true
    },
    rooms: new mongoose_1.Schema({
        roomId: String,
    })
}));
exports.default = UserModel;
//# sourceMappingURL=users.js.map