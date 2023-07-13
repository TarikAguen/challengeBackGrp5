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
const express_1 = __importDefault(require("express"));
const decryptJWT_1 = require("../utils/decryptJWT");
const { addUserEmail } = require("../controller/post.controller");
const { teest, verifyTestFile } = require("../controller/challenge.controller");
const router = express_1.default.Router();
router.post('/', addUserEmail);
router.post('/tt', verifyTestFile);
router.post('/testToken', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvdGFjaXY0NjRAbmliYWNrLmNvbSIsImlkVXNlciI6MjYsImlhdCI6MTY4OTE5MzAxNSwiZXhwIjoxNjg5MTk2NjE1fQ.vjtALO1sdPLTmDrLy0-0tF7DTmolff09K_4ZVWYpGPU';
    yield (0, decryptJWT_1.benchJWT)(token);
    res.sendStatus(200); // Send success status
}));
exports.default = router;
