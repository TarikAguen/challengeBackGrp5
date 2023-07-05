"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const port = process.env.PORTSERV || 3050;
const app = (0, express_1.default)();
// Middleware qui permet de traiter les données de la req
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use('/', routes_1.default);
// Lancer le serveur
app.listen(port, () => console.log(`Le serveur a démarré au port ${port}`));