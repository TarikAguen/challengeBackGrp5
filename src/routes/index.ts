import express from 'express';
import { benchJWT } from '../utils/decryptJWT';
const {addUserEmail} = require("../controller/post.controller")
const {teest, verifyTestFile} = require("../controller/challenge.controller")




const router = express.Router();
router.post('/test', teest);
router.post('/', addUserEmail);
router.post('/tt', verifyTestFile);

export default router;
