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
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
class WordManager {
    constructor() {
        this.data = [];
        fs_1.default.readFile(path_1.default.join(__dirname, '..', '..', 'src', 'wordList.json'), 'utf8', (err, data) => {
            this.data = JSON.parse(data);
        });
    }
    searchDefinition(term) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                method: 'GET',
                url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
                params: { entry: term },
                headers: {
                    'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
                    'X-RapidAPI-Key': '74ef1cb652mshf6bc26b1ca93065p16858ejsn7914bb7fd89a'
                }
            };
            try {
                let response = yield axios_1.default.request(options);
                return response.data;
            }
            catch (err) {
                throw new Error('Error : searchDefinition ' + err);
            }
        });
    }
    isItAWord(term) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.searchDefinition(term);
                return response.result_code === '200';
            }
            catch (err) {
                throw new Error('Error : isItAWord ' + err);
            }
        });
    }
    randomWord() {
        let maxNum = this.data.length;
        let randomNum = Math.floor(Math.random() * maxNum);
        let randomWord = this.data[randomNum];
        return randomWord;
    }
    checkAnswer(submit, answer) {
        let result = Array(5).fill('normal');
        for (let i = 0; i < 5; i++) {
            if (submit[i] === answer[i]) {
                result[i] = 'right';
            }
            else if (answer.includes(submit[i])) {
                result[i] = 'wrong position';
            }
            else {
                result[i] = 'wrong';
            }
        }
        return result;
    }
}
exports.default = new WordManager();
