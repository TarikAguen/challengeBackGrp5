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
exports.addEmail = exports.connexion = void 0;
const db_1 = __importDefault(require("../config/db"));
const connexion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const test = `SELECT id FROM user;`;
    db_1.default.query(test, (err, data) => {
        if (err)
            return res.json("Erreur");
        return res.json(data);
    });
});
exports.connexion = connexion;
// email
const addEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    // Vérifiez si l'email a été fourni
    if (!email) {
        return res.status(400).json({ message: 'L\'e-mail est requis.' });
    }
    // Créez la requête SQL pour insérer l'e-mail dans la base de données
    const query = 'INSERT INTO user (email) VALUES (?)';
    db_1.default.query(query, [email], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Une erreur est survenue lors de l\'ajout de l\'e-mail.' });
        }
        return res.status(200).json({ message: 'L\'e-mail a été ajouté avec succès.' });
    });
});
exports.addEmail = addEmail;
