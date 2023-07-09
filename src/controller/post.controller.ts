import { Request, Response } from 'express';
import db from '../config/db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from '../authentification/mailjet';

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
      const user = rows[0] as { email: string };
      return res.status(200).json({ message: "Connecté avec succès", user });
    }

    // Générez la clé secrète
    const generateSecretKey = () => {
      const length = 32; // Longueur de la clé en octets (256 bits)
      return crypto.randomBytes(length).toString('hex');
    };

    const secretKey = generateSecretKey();

    // Générez le JWT
    const expiresIn = '7d'; // Durée de validité du JWT, dans cet exemple 7 jours
    const token = jwt.sign({ email }, secretKey, { expiresIn });

    // Envoyez l'e-mail avec le JWT
    try {
      await sendMail(token, email);
      return res.status(200).json({ message: "E-mail envoyé, veuillez vérifier votre boîte mail." });
    } catch (error) {
      console.error("Une erreur est survenue lors de l'envoi de l'e-mail :", error);
      return res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
    }
    
    // Insérez l'e-mail dans la base de données
    const query = 'INSERT INTO user (email) VALUES (?)';
    await db.query(query, [email]);

    return res.status(200).json({ message: "L'e-mail a été ajouté avec succès." });
  } catch (error) {
    console.error("Une erreur est survenue lors de l'ajout de l'e-mail :", error);
    return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de l'e-mail." });
  }
};
