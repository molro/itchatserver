"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const key = config_1.default.get('PRIVATEKEY');
function tokenValidation(req, res, next) {
    const token = req.header('auth-token');
    if (!token)
        return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verify = jsonwebtoken_1.default.verify(token, key);
        next();
    }
    catch (err) {
        res.status(400).json({ error: 'Token no válido' });
    }
}
exports.default = tokenValidation;
//# sourceMappingURL=validate.js.map