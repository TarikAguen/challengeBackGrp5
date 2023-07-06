import { Request, Response } from 'express';
import db from '../config/db';

export const addUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Vérifiez si l'email a été fourni
    if (!email) {
      return res.status(400).json({ message: "L'email est requis." });
    }

    // Vérifiez le format de l'adresse e-mail
    const emailRegex = /^[^\s@]+@[a-zA-Z]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      return res.status(400).json({ message: "L'adresse e-mail est invalide." });
      }
   
    // Vérifiez si l'e-mail contient 'hetic' après l'arobase
    const domain = email.split('@')[1];
    if (domain.toLowerCase().includes('hetic')) {
      return res.status(400).json({ message: "Les adresses e-mail contenant 'hetic' ne sont pas autorisées." });
      }
   // Vérifiez si l'e-mail existe déjà dans la base de données
   const checkQuery = 'SELECT * FROM user WHERE email = ?';
   const [rows] = await db.query(checkQuery, [email]);

   if (Array.isArray(rows) && rows.length > 0) {
     // L'e-mail existe déjà, connectez l'utilisateur sur sa session
     const user = rows[0] as { email: string }; // Ajout de la vérification de type
     return res.status(200).json({ message: "Connecté avec succès", user });
   }
    // Insérez l'e-mail dans la base de données
    const query = 'INSERT INTO user (email) VALUES (?)';
    await db.query(query, [email]);

    return res.status(200).json({ message: "L'e-mail a été ajouté avec succès." });
  } catch (error) {
    console.error('Une erreur est survenue lors de l\'ajout de l\'e-mail :', error);
    return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de l\'e-mail.' });
  }
};
