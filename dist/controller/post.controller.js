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
exports.addUserEmail = void 0;
const db_1 = __importDefault(require("../config/db"));
const mailjet_1 = require("../mailing/mailjet");
const createToken_1 = require("../utils/createToken");
const decryptJWT_1 = require("../utils/decryptJWT");
const addUserEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const [rows] = yield db_1.default.query(checkQuery, [email]);
        if (Array.isArray(rows) && rows.length > 0) {
            // L'e-mail existe déjà, connectez l'utilisateur sur sa session
            const user = rows[0];
            return res.status(200).json({ message: "Connecté avec succès", user });
        }
        // Générez la clé secrète
        // Générez le JWT
        // const expiresIn = '7d'; // Durée de validité du JWT, dans cet exemple 7 jours
        // const token = jwt.sign({ email }, secretKey, { expiresIn });
        // Envoyez l'e-mail avec le JWT
        try {
            const EmailQuery = 'INSERT INTO user (email, promotion) VALUES (?, "challenge unix")';
            const idQuery = 'SELECT id FROM user WHERE email = (?)';
            yield db_1.default.query(EmailQuery, [email]);
            let idUser = yield db_1.default.query(idQuery, [email]);
            idUser = idUser[0][0].id;
            const payload = { email, idUser };
            const token = yield (0, createToken_1.createToken)(payload);
            (0, decryptJWT_1.benchJWT)('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvdGFjaXY0NjRAbmliYWNrLmNvbSIsImlkVXNlciI6MjYsImlhdCI6MTY4OTE5MzAxNSwiZXhwIjoxNjg5MTk2NjE1fQ.vjtALO1sdPLTmDrLy0-0tF7DTmolff09K_4ZVWYpGPU');
            yield (0, mailjet_1.sendMail)(token, email);
            const userEmail = email;
            return res.status(200).json({ message: "E-mail envoyé, veuillez vérifier votre boîte mail.", token });
        }
        catch (error) {
            console.error("Une erreur est survenue lors de l'envoi de l'e-mail :", error);
            return res.status(500).json({ message: "Une erreur est survenue lors de l'envoi de l'e-mail." });
        }
        return res.status(200).json({ message: "L'e-mail a été ajouté avec succès.", email });
    }
    catch (error) {
        console.error("Une erreur est survenue lors de l'ajout de l'e-mail :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de l'e-mail." });
    }
});
exports.addUserEmail = addUserEmail;
