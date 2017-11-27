import { setWordsToStorage } from './storage';

class WordList {
  constructor(words) {
    this.wordList = words;
  }
  setWordList(list) {
    this.wordList = list;
  }
  getWordList() {
    return this.wordList;
  }

  /**
   * converts to array of object
   * @return {[type]} [description]
   */
  toStorage() {
    const words = this.wordList.map(word => {
      return word.toObject();
    });
    return words;
  }

  removeWord(index) {
    console.log('-- orig wordList', this.wordList);
    this.wordList.splice(index, 1);
    console.log('--- newWordList', this.wordList);
  }
}

export default WordList;
