import express, { Request, Response} from 'express';
import cors from 'cors';
import routes from './routes'
import db from './config/db'

const port = process.env.PORTSERV || 3050;
const app = express();
// Middleware qui permet de traiter les données de la req
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', routes);

// Lancer le serveur
app.listen(port, () => console.log(`Le serveur a démarré au port ${port}`));
