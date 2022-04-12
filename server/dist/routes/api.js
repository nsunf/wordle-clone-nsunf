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
            res.send({ status: 'failure', tiles: [] });
        }
    });
});
router.post('/newGame', (req, res) => {
    req.session.process = null;
    req.session.state = 'new';
    req.session.word = word_1.default.randomWord();
    res.send('/api/newGame called');
});
router.post('/answer', (req, res) => {
    res.send(req.session.word);
});
router.post('/saveProcess', (req, res) => {
    req.session.state = req.body.state;
    req.session.process = { rows: req.body.rows, cursor: req.body.cursor };
    res.send('/api/save called');
});
router.post('/load', (req, res) => {
    res.send({ process: req.session.process, state: req.session.state });
});
router.post('/addHistory', (req, res) => {
    if (!req.session.history)
        req.session.history = [];
    if (!req.session.word)
        res.send('word undefined');
    req.session.history.push({ tiles: req.body.data, word: req.session.word, status: req.body.status });
    res.send('/api/addHistory called');
});
router.post('/getHistory', (req, res) => {
    res.send(req.session.history);
});
exports.default = router;
