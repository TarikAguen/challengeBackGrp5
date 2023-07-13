import Mailjet from 'node-mailjet';
import { config } from 'dotenv';
import {MailOptions, MailjetConfig} from '../types/mail/mailinterface';
config();

const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC as string,
    apiSecret: process.env.MJ_APIKEY_PRIVATE as string
} as MailjetConfig);

export const sendMail = async (token: string, receiver: string): Promise<void> => {
    
    const request = mailjet
    .post('send', {version : 'v3.1'})
    .request({
        Messages: [
            {
            From: {
                Email: 't_aguenchich@hetic.eu',
                Name: 'Votre lien d\'accès !'
            },
            To: [{Email: receiver}],
            Subject: 'Voici votre lien d\'accès !',
            TextPart: 'Lien de connexion',
            HTMLPart: `<p>Lien de connexion : <a href="http://localhost:3000/challenge/?token=${token}">http://localhost:3000/challenge/?token=${token}</a></p>`,
            CustomID: '1'
        } as MailOptions
        ]
    })
    try {
        await request;
    } catch (error: any) {
        console.error(error.statusCode);
    }
}
