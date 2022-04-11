"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_1 = __importDefault(require("../services/word"));
function createUser(req, res, nxt) {
    if (!req.session.word) {
        req.session.word = word_1.default.randomWord();
        req.session.history = [];
        console.log('New User ---> ' + req.session.word);
    }
    else {
        console.log('Old User ---> ' + req.session.word);
    }
    nxt();
}
exports.default = createUser;
