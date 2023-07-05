import { Request, Response } from 'express';
import db from '../config/db';

export const connexion = async (req: Request, res: Response) => {
  const test = `SELECT id FROM user;`;
  db.query(test, (err, data) => {
    if (err) return res.json("Erreur");
    return res.json(data);
  });
};

// email

export const addEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  // Vérifiez si l'email a été fourni
  if (!email) {
    return res.status(400).json({ message: 'L\'e-mail est requis.' });
  }

  // Créez la requête SQL pour insérer l'e-mail dans la base de données
  const query = 'INSERT INTO user (email) VALUES (?)';
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de l\'e-mail.' });
    }

    return res.status(200).json({ message: 'L\'e-mail a été ajouté avec succès.' });
  });
};
