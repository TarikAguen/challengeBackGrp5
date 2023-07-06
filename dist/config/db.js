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
exports.getConnection = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const db = promise_1.default.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootpassword',
    database: 'challengefinal',
    connectionLimit: 10,
});
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield db.getConnection();
        console.log('Connexion à la base de données réussie !');
        return connection;
    }
    catch (error) {
        console.error('Erreur lors de la connexion à la base de données :', error.message);
        throw error;
    }
});
exports.getConnection = getConnection;
(0, exports.getConnection)();
exports.default = db;
