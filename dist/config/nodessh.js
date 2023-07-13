"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectSSH = void 0;
const { Client } = require('ssh2');
const connectSSH = ({ host, port, username, privateKey }) => {
    const conn = new Client();
    return new Promise((resolve, reject) => {
        conn.on('ready', () => {
            console.log('Connexion SSH établie');
            resolve(conn);
        }).connect({
            host: host,
            port: port,
            username: username,
            privateKey: privateKey,
            passphrase: ''
        });
        conn.on('error', (err) => {
            console.error('Erreur de connexion SSH :', err);
            reject(err);
        });
    });
};
exports.connectSSH = connectSSH;
exports.default = exports.connectSSH;
