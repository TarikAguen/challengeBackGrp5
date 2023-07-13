import express, { Request, Response} from 'express';
import cors from 'cors';
import routes from './routes'
import db from './config/db'

const port = process.env.PORTSERV || 3050;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/', routes);

app.listen(port, () => console.log(`Le serveur a démarré au port ${port}`));
