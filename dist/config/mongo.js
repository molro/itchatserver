"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const mongoURI = config_1.default.get('MONGO_URI');
const options = {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4 // Use IPv4, skip trying IPv6
};
module.exports.startDb = () => {
    mongoose_1.default.connect(mongoURI, options).then(() => console.log('connected to MONGO_URI')).
        catch((err) => console.log(err));
};
//# sourceMappingURL=mongo.js.map