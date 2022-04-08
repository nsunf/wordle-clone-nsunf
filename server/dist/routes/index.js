"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const word_1 = __importDefault(require("../services/word"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    if (!req.session.word) {
        req.session.word = word_1.default.randomWord();
        console.log('New User ---> ' + req.session.word);
    }
    else {
        console.log('Old User ---> ' + req.session.word);
    }
    res.sendFile(path_1.default.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'));
});
exports.default = router;
