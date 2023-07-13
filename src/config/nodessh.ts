const { Client } = require('ssh2');
import { readFileSync } from 'fs';
interface ParamSSH {
    host: string,
    port: number,
    username: string,
    privateKey: string
}
export const connectSSH = ({host, port, username, privateKey}: ParamSSH): Promise<any> => {  const conn = new Client();
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

    conn.on('error', (err: any) => {
      console.error('Erreur de connexion SSH :', err);
      reject(err);
    });
  });
};

export default connectSSH;

