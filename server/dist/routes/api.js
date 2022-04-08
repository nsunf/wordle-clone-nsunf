"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const word_1 = __importDefault(require("../services/word"));
const router = express_1.default.Router();
router.post('/submit', (req, res) => {
    let word = req.body.word;
    let answer = req.session.word;
    word_1.default.isItAWord(word)
        .then(isWord => {
        if (isWord) {
            if (!answer)
                throw new Error('session word missing');
            res.send({ status: 'succeed', tiles: word_1.default.checkAnswer(word, answer.toUpperCase()) });
        }
        else {
            res.send({ status: 'failure', tiles: null });
        }
    });
});
exports.default = router;
