import express from 'express';
const {connexion, addEmail} = require("../controller/post.controller")

const router = express.Router();

router.post('/', addEmail);
router.get('/tt');

export default router;
