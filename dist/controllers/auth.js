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
exports.logOut = exports.loginPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const users_1 = __importDefault(require("../models/users"));
const mongoURI = config_1.default.get('MONGO_URI');
const key = config_1.default.get('PRIVATEKEY');
const mongoOpt = config_1.default.get('mongoOpt');
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user;
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        user = yield users_1.default.findOne({ email: email });
        if (!user) {
            return res.status(200).json({
                msg: 'Usuario y/o Password incorrectos'
            });
        }
        const validPass = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPass) {
            return res.status(200).json({
                msg: 'Usuario y/o Password incorrectos'
            });
        }
        if (!user.state) {
            return res.status(200).json({
                msg: 'Iniciaste sesión en otro dispositivo!'
            });
        }
        const payload = { nickname: user.nickname, email: user.email, passport: user.passport };
        let token = jsonwebtoken_1.default.sign(payload, key);
        res.status(200).json({ msg: 'Sesión Iniciada', user: user, token: token });
        yield users_1.default.findOne({ email: email }).updateOne({ state: false });
        mongoose_1.default.connection.close();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.loginPost = loginPost;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    yield mongoose_1.default.connect(mongoURI, mongoOpt);
    yield users_1.default.findOne({ nickname: user }).updateOne({ state: true });
    mongoose_1.default.connection.close();
    res.status(200).json({ msg: 'Sesión cerrada' });
});
exports.logOut = logOut;
//# sourceMappingURL=auth.js.map