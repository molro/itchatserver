"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    CORSORIGIN: process.env.CORSORIGIN,
    PORT: process.env.PORT,
    HOST: process.env.HOST,
    PASSWORD: process.env.PASSWORD,
    MONGO_URI: process.env.MONGO_URI,
    mongoOpt: {
        autoIndex: true,
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4 // Use IPv4, skip trying IPv6'
    },
    PRIVATEKEY: process.env.PRIVATEKEY,
};
//# sourceMappingURL=default.js.map