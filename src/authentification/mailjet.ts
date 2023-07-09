import Mailjet from 'node-mailjet'
require('dotenv').config();


const mailjet = new Mailjet({
    apiKey: process.env.MJ_APIKEY_PUBLIC,
    apiSecret: process.env.MJ_APIKEY_PRIVATE
});

export const sendMail = async (token: string, receiver: string) => {
    console.log(process.env.MJ_APIKEY_PUBLIC);
    const request = mailjet
    .post('send', {version : 'v3.1'})
    .request({
        Messages: [
            {
            From: {
                Email: 'tarikaguen45@hotmail.fr',
                Name: 'Votre lien d\'accès !'
            },
            To: [{Email: receiver}],
            Subject: 'Voici votre lien d\'accès !',
            TextPart: 'Lien de connexion',
            HTMLPart: `<p>Lien de connexion : <a href="http://localhost:3050/?token=${token}">http://localhost:3050/?token=${token}</a></p>`,
            CustomID: '1'

        }
    ]
    })
    try {
        await request
    }   catch (error: any) {
        console.error(error.statusCode)
        
    }
    
}