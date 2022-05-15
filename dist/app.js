"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("config"));
const socketsimple_1 = __importDefault(require("./controllers/socketsimple"));
const package_json_1 = require("./package.json");
const route_1 = __importDefault(require("./routes/route"));
const port = config_1.default.get('PORT') || 4000;
// const host = config.get<string>('HOST'); ENV
const corsOrigin = config_1.default.get('CORSORIGIN');
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: corsOrigin,
        credentials: true
    },
});
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(route_1.default);
httpServer.listen(port, /*host,*/ () => {
    console.log(`🚀 Chat Server version: ${package_json_1.version} is listening 🚀 `);
    // console.log(`http://${host}:${port}`);
    (0, socketsimple_1.default)({ io });
});
//# sourceMappingURL=app.js.map