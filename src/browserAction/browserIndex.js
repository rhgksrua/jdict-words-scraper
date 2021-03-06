// word
import Word from './Word';
import { polyfill } from 'es6-promise';
polyfill();
import fetch from 'isomorphic-fetch';
// Word List
import WordList from './WordList';
// handles DOM manipulation
import Display from './Display';
// handles chrome storage.local
// returns promise
import { getWordsFromStorage, resetStorage } from './storage';

const parent = document.querySelector('.word-list');
const wordList = new WordList();
const display = new Display(parent, wordList);
const fetchWordList = getWordsFromStorage();

fetchWordList
.then(words => {
  const wordsArr = words.map(word => {
    const { furi, kanji, meaning } = word;
    return new Word(furi, kanji, meaning);
  });
  return wordsArr;
})
.then(arr => {
  wordList.setWordList(arr);
  display.render(wordList);
  downloadListener();
  resetList();
})
.catch(error => {
  console.error(error);
});

/**
 * Initializes Word
 * @param  {object} words [object]
 * @return {Word}         [new Word]
 */
const wordsToWords = words => {
  const wordsArr = words.map(word => {
    const { furi, kanji, meaning } = word;
    return new Word(furi, kanji, meaning);
  });
  return wordsArr;
};

/**
 * 
 * @param {string} longString - csv text
 */
const initiateDownload = longString => {
  console.log('hello world');
  const a = document.createElement('a');
  const file = new Blob([longString], {type: 'text/plain'});
  const url = window.URL.createObjectURL(file);
 chrome.downloads.download({
   url,
   filename: "jlptWordList.txt"
 });
};

const reduceArrayToString = arrWords => {
  return arrWords.reduce((a, b) => {
    return a + b.wordToString();
  }, '');
};

/**
 * Attach download listener
 */
function downloadListener() {
  const download = document.querySelector('.download');
  download.addEventListener('click', () => {
    fetchWordList
    .then(wordsToWords)
    .then(reduceArrayToString)
    .then(initiateDownload)
    .catch(error => {
      console.error(error);
    });
  });
}

/**
 * Resets words list
 */
function resetList() {
  const resetBtn = document.querySelector('.reset');
  resetBtn.addEventListener('click', () => {
    const wordList = document.querySelector('.word-list');
    while (wordList.firstChild) {
      wordList.removeChild(wordList.firstChild);
    }
    resetStorage();
  });
}
