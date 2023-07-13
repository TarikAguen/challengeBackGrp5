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
exports.verifyTestFile = exports.teest = exports.connetSSH = void 0;
const nodessh_1 = require("../config/nodessh");
const db_1 = __importDefault(require("../config/db"));
const connetSSH = (param) => __awaiter(void 0, void 0, void 0, function* () {
    // Votre code de connexion SSH ici
});
exports.connetSSH = connetSSH;
const teest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { host, port, username, privateKey } = req.body;
        const param = {
            host: host,
            port: port,
            username: username,
            privateKey: privateKey
        };
        yield (0, nodessh_1.connectSSH)(param);
        return res.status(200).json({ message: "La connexion a réussi !" });
    }
    catch (_a) {
        return res.status(400).json({ message: "La connexion a échoué" });
    }
});
exports.teest = teest;
const verifyTestFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Récupérez les mêmes paramètres que dans la fonction 'teest'
        let userScore = 0;
        const { host, port, username, privateKey } = req.body;
        const userEmail = req.body.email;
        const param = {
            host: host,
            port: port,
            username: username,
            privateKey: privateKey
        };
        const conn = yield (0, nodessh_1.connectSSH)(param);
        conn.exec('. test.sh', (err, stream) => {
            if (err) {
                console.log("Le fichier test n'a pas pu être trouvé.");
                conn.end(); // Ferme la connexion SSH
                return res.status(404).json({ message: "Le fichier test n'a pas pu être trouvé." });
            }
            let output = '';
            stream.on('data', (data) => {
                output += data.toString();
            });
            stream.on('close', () => {
                if (output.trim() === '') {
                    console.log('Le fichier est vide.');
                    return res.status(200).json({ message: 'Le fichier est vide.' });
                }
                else {
                    const result = parseInt(output.trim());
                    if (result === 30) {
                        console.log('Le résultat est correct :', result);
                        // Mettez à jour le score de l'utilisateur dans la base de données
                        const updatedScore = userScore + 4; // Suppose que vous avez déjà récupéré le score de l'utilisateur
                        const scoreone = `UPDATE user_challenge SET score = ? WHERE email = 'tarikaguen@hotmail.fr'`;
                        db_1.default.query(scoreone, updatedScore);
                        // Effectuez l'opération de mise à jour de la base de données ici
                        console.log('Le score de l\'utilisateur a été mis à jour :', updatedScore);
                        return res.status(200).json({ message: 'Le résultat est correct. Le score de l\'utilisateur a été mis à jour.' });
                    }
                    else {
                        console.log('Le résultat n\'est pas correct :', result);
                        return res.status(200).json({ message: 'Le résultat n\'est pas correct.' });
                    }
                }
                conn.end(); // Ferme la connexion SSH
            });
        });
    }
    catch (error) {
        console.error("Une erreur est survenue lors de la vérification du fichier test :", error);
        return res.status(500).json({ message: "Une erreur est survenue lors de la vérification du fichier test." });
    }
});
exports.verifyTestFile = verifyTestFile;
