"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const word_1 = __importDefault(require("../services/word"));
const router = express_1.default.Router();
router.post('/submit', (req, res) => {
    var _a;
    let word = req.body.word;
    let answer = (_a = req.session.word) !== null && _a !== void 0 ? _a : 'hello';
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
router.post('/newGame', (req, res) => {
    req.session.word = word_1.default.randomWord();
    req.session.process = null;
    res.send('/api/newGame called');
});
router.post('/answer', (req, res) => {
    res.send(req.session.word);
});
router.post('/save', (req, res) => {
    let rows = req.body.rows;
    let cursor = req.body.cursor;
    req.session.process = { rows, cursor };
    res.send('/api/save called');
});
router.post('/load', (req, res) => {
    res.send(req.session.process);
});
exports.default = router;
