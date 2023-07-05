import express from 'express';
const {test} = require("../controller/post.controller")

const router = express.Router();

router.get('/testy');
router.get('/');

export default router;
