// word
import Word from './Word';

// Word List
import WordList from './WordList';

// handles DOM manipulation
import Display from './Display';

// handles chrome storage.local
// returns promise
import { getWordsFromStorage } from './storage';

const parent = document.querySelector('.word-list');

const wordList = new WordList();
const display = new Display(parent);

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
})
.catch(error => {
  console.error(error);
});
