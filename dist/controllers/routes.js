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
exports.others = exports.forbidden = exports.registerPost = exports.registerGet = exports.home = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = __importDefault(require("../models/users"));
const config_1 = __importDefault(require("config"));
const mongoURI = config_1.default.get('MONGO_URI');
const mongoOpt = config_1.default.get('mongoOpt');
const key = config_1.default.get('PRIVATEKEY');
const home = (req, res) => {
    try {
        res.json({ msg: 'conexión Ok' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Petición erronéa' });
    }
};
exports.home = home;
const registerGet = (req, res) => {
    try {
        res.json({ msg: 'Ver mis datos de usuario' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Petición erronéa' });
    }
};
exports.registerGet = registerGet;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('registro');
    const newUser = req.body;
    const newPassport = newUser.nickname + newUser.email;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passwordHashed = bcryptjs_1.default.hashSync(newUser.password, salt);
    const passport = bcryptjs_1.default.hashSync(newPassport, salt);
    try {
        yield mongoose_1.default.connect(mongoURI, mongoOpt);
        let users = yield users_1.default.find({});
        let findName = yield users_1.default.findOne({ nickname: newUser.nickname });
        let findUser = yield users_1.default.findOne({ email: newUser.email });
        let token = jsonwebtoken_1.default.sign({ nickname: newUser.nickname, email: newUser.email, password: passport }, key);
        if (!(findUser === null || findUser === void 0 ? void 0 : findUser.email)) {
            if (findName) {
                let nicknameRepeated = newUser.nickname + `${users.length}`;
                yield mongoose_1.default.connect(mongoURI, mongoOpt);
                const user = new users_1.default({
                    nickname: nicknameRepeated,
                    email: newUser.email,
                    password: passwordHashed,
                    passport: passport,
                    token: token
                });
                yield user.save();
                res.json({
                    msg: 'Tu nickname ya existe, te hemos sugerido uno! Podrás modificarlo luego',
                    nickname: nicknameRepeated
                });
            }
            else {
                yield mongoose_1.default.connect(mongoURI, mongoOpt);
                const user = new users_1.default({
                    nickname: newUser.nickname,
                    email: newUser.email,
                    password: passwordHashed,
                    passport: passport,
                    token: token
                });
                yield user.save();
                res.json({
                    msg: 'Bienvenido!!!',
                    nickname: newUser.nickname
                });
            }
        }
        else {
            res.json({ msg: 'El email ya está en uso' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400);
    }
});
exports.registerPost = registerPost;
const forbidden = (req, res) => {
    try {
        res.json({ msg: 'Ups! No tienes acceso' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Petición erronéa' });
    }
};
exports.forbidden = forbidden;
const others = (req, res) => {
    try {
        res.status(404).json({ msg: 'Página no existe - 404' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ msg: 'Petición erronéa' });
    }
};
exports.others = others;
//# sourceMappingURL=routes.js.map