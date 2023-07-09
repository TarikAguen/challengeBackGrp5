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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const mailjet_1 = require("../authentification/mailjet");
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
        const generateSecretKey = () => {
            const length = 32; // Longueur de la clé en octets (256 bits)
            return crypto_1.default.randomBytes(length).toString('hex');
        };
        const secretKey = generateSecretKey();
        // Générez le JWT
        const expiresIn = '7d'; // Durée de validité du JWT, dans cet exemple 7 jours
        const token = jsonwebtoken_1.default.sign({ email }, secretKey, { expiresIn });
        // Envoyez l'e-mail avec le JWT
        yield (0, mailjet_1.sendMail)(token, email);
        // Insérez l'e-mail dans la base de données
        const query = 'INSERT INTO user (email) VALUES (?)';
        yield db_1.default.query(query, [email]);
        return res.status(200).json({ message: "L'e-mail a été ajouté avec succès." });
    }
    catch (error) {
        console.error("Une erreur est survenue lors de l'ajout de l'e-mail :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de l'ajout de l'e-mail." });
    }
});
exports.addUserEmail = addUserEmail;
