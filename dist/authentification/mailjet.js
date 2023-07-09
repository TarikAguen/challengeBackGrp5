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
exports.sendMail = void 0;
const node_mailjet_1 = __importDefault(require("node-mailjet"));
require('dotenv').config();
const mailjet = new node_mailjet_1.default({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});
const sendMail = (token, receiver) => __awaiter(void 0, void 0, void 0, function* () {
    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
        Messages: [
            {
                From: {
                    Email: 'tarikaguen45@hotmail.fr',
                    Name: 'Votre lien d\'accès !'
                },
                To: [{ Email: receiver }],
                Subject: 'Voici votre lien d\'accès !',
                TextPart: 'Lien de connexion',
                HTMLPart: '',
                CustomID: '1'
            }
        ]
    });
    try {
        yield request;
    }
    catch (error) {
        console.error(error.statusCode);
    }
});
exports.sendMail = sendMail;
