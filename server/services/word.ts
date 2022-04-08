import fs from 'fs';
import path from 'path';
import axios, { AxiosRequestConfig } from 'axios';
interface TwinwordRes {
  entry: string;
  request: string;
  response: string;
  meaning: {
    noun: string;
    verb: string;
    adverb: string;
    adjective: string;
  };
  ipa: string;
  version: string;
  author: string;
  email: string;
  result_code: string;
  result_msg: string;
}

type TileState = 'right'|'wrong position'|'wrong'|'normal';


class WordManager {
  data: string[] = [];
  constructor() {
    fs.readFile(path.join(__dirname, '..', '..', 'src', 'wordList.json'), 'utf8', (err, data) => {
      this.data = JSON.parse(data);
    })
  }

  async searchDefinition(term: string): Promise<TwinwordRes> {
    let options: AxiosRequestConfig = {
      method: 'GET',
      url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/definition/',
      params: {entry: term},
      headers: {
        'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com',
        'X-RapidAPI-Key': '74ef1cb652mshf6bc26b1ca93065p16858ejsn7914bb7fd89a'
      }
    };

    try {
      let response = await axios.request(options)
      return response.data
    } catch (err) {
      throw new Error('Error : searchDefinition ' + err)
    }
  }

  async isItAWord(term: string): Promise<boolean> {
    try {
      let response = await this.searchDefinition(term);
      return response.result_code === '200';
    } catch (err) {
      throw new Error('Error : isItAWord ' + err);
    }
  }

  randomWord() {
    let maxNum = this.data.length;
    let randomNum = Math.floor(Math.random() * maxNum);
    let randomWord = this.data[randomNum];

    return randomWord;
  }

  checkAnswer(submit: string, answer: string): TileState[] {
    let result: TileState[] = Array(5).fill('normal');
    for (let i = 0; i < 5; i++) {
      if (submit[i] === answer[i]) {
        result[i] = 'right';
      } else if (answer.includes(submit[i])) {
        result[i] = 'wrong position';
      } else {
        result[i] = 'wrong';
      }
    }
    return result;
  }
}

export default new WordManager();