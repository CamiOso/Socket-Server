"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const environment_1 = require("./global/environment");
const server = new server_1.default();
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${environment_1.SERVER_PORT} `);
});
