import { Request, Response } from 'express';
import db from '../config/db';

export const connexion = async (req: Request, res: Response) => {
  const test = `SELECT id FROM user;`;
  db.query(test, (err, data) => {
    if (err) return res.json("Erreur");
    return res.json(data);
  });
};
