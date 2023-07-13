import { Request, Response } from 'express';
import db from '../config/db';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendMail } from '../mailing/mailjet';
import { createToken } from '../utils/createToken';
import { benchJWT } from '../utils/decryptJWT';


export const addUserEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "L'email est requis." });
    }

    const emailRegex = /^[^\s@]+@[a-zA-Z]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      return res.status(400).json({ message: "L'adresse e-mail est invalide." });
    }

    const domain = email.split('@')[1];
    if (domain.toLowerCase().includes('hetic')) {
      return res.status(400).json({ message: "Les adresses e-mail contenant 'hetic' ne sont pas autorisées." });
    }

    const checkQuery = 'SELECT * FROM user WHERE email = ?';
    const [rows] = await db.query(checkQuery, [email]);

    if (Array.isArray(rows) && rows.length > 0) {
      const user = rows[0] as { email: string };
      return res.status(200).json({ message: "Connecté avec succès", user });
    }

    
    
    try {
      
      const EmailQuery = 'INSERT INTO user (email, promotion) VALUES (?, "challenge unix")';
      const idQuery = 'SELECT id FROM user WHERE email = (?)';
  
      await db.query(EmailQuery, [email]);
      let idUser : any = await db.query(idQuery, [email])
      idUser = idUser[0][0].id
      const payload = { email, idUser };
      const token = await createToken(payload);
      await sendMail(token, email);
      const userEmail = email;
      return res.status(200).json({ message: "E-mail envoyé, veuillez vérifier votre boîte mail.", token });
    } catch (error) {
      console.error("Une erreur est survenue lors de l'envoi de l'e-mail :", error);
      return res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
    }
    
    

    return res.status(200).json({ message: "L'e-mail a été ajouté avec succès.", email });
  } catch (error) {
    console.error("Une erreur est survenue lors de l'ajout de l'e-mail :", error);
    return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de l'e-mail." });
  }
};
