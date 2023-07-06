import express from 'express';
const {addUserEmail} = require("../controller/post.controller")



const router = express.Router();

router.post('/', addUserEmail);
router.get('/tt');

export default router;
