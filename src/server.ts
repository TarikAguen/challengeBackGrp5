const express = require("express");
const db = require("../config/db");
const port = process.env.PORTSERV || 3050;
const cors = require("cors");

const app = express();



//Middleware qui permet de traiter les données de la req

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Erreur serveur");
});

app.use("/", require("./routes/post.routes"));
// Lancer le serveur
app.listen(port, () => console.log("Le serveur a démarré au port " + port));
