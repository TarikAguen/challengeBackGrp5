"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const db = mysql_1.default.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'sqluser',
    password: 'root',
    database: 'challengefinal',
    connectionLimit: 10,
});
db.getConnection((error) => {
    if (error) {
        throw error;
    }
    console.log('La base de données est maintenant opérationnelle.');
});
exports.default = db;
