import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';
import jwt from 'jsonwebtoken';
import { Client } from 'ssh2';
import {connectSSH} from '../config/nodessh';
import db from '../config/db';
import {addUserEmail} from '../controller/post.controller';




interface Infos {
    email: string,
    score: number,
    challenge: string
}



export const connetSSH = async (param: any) => {
    // Votre code de connexion SSH ici
  };
  

  export const teest = async (req: Request, res: Response) => {
    try {
      const { host, port, username, privateKey } = req.body;
      const param = {
        host: host as string,
        port: port as number,
        username: username as string,
        privateKey: privateKey as string
      };
  
      await connectSSH(param);
      return res.status(200).json({ message: "La connexion a réussi !" });
    } catch {
      return res.status(400).json({ message: "La connexion a échoué" });
    }
  };

export const verifyTestFile = async (req: Request, res: Response) => {
    try {
        let userScore = 0;
        const { host, port, username, privateKey } = req.body;
        const param = {
            host: host as string,
            port: port as number,
            username: username as string,
            privateKey: privateKey as string
        };
  
        const conn: Client = await connectSSH(param) as Client;
        conn.exec('. test.sh', (err: any, stream: any) => {
        if (err) {
            console.log("Le fichier test n'a pas pu être trouvé.");
            conn.end();
            return res.status(404).json({ message: "Le fichier test n'a pas pu être trouvé." });
        }

        let output = '';
        stream.on('data', (data: string | Buffer) => {
            output += data.toString();
        });

            stream.on('close', () => {
            if (output.trim() === '') {
            console.log('Le fichier est vide.');
            return res.status(200).json({ message: 'Le fichier est vide.' });
            } else {
            const result = parseInt(output.trim());
            if (result === 30) {
                console.log('Le résultat est correct :', result);
                const updatedScore = userScore + 4; 
                const scoreone = `UPDATE user_challenge SET score = ? WHERE email = 'tarikaguen45@hotmail.fr'`;
                db.query(scoreone, updatedScore)
                console.log('Le score de l\'utilisateur a été mis à jour :', updatedScore);
                return res.status(200).json({ message: 'Le résultat est correct. Le score de l\'utilisateur a été mis à jour.' });
            } else {
                console.log('Le résultat n\'est pas correct :', result);
                return res.status(200).json({ message: 'Le résultat n\'est pas correct.' });
            }
            }

            conn.end();
        });
        });
    } catch (error) {
        console.error("Une erreur est survenue lors de la vérification du fichier test :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de la vérification du fichier test." });
    }
};
