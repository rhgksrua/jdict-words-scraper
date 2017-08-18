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
  downloadListener();

})
.catch(error => {
  console.error(error);
});

function wordsToWords(words) {
  const wordsArr = words.map(word => {
    const { furi, kanji, meaning } = word;
    return new Word(furi, kanji, meaning);
  });
  return wordsArr;
}

function downloadListener() {
  const download = document.querySelector('.download');
  download.addEventListener('click', () => {
    fetchWordList
    .then(words => {
      return wordsToWords(words)
    })
    .then(words => {
      return words.reduce((a, b) => {
        //console.log(word.wordToString().split('\t'));
        return a + b.wordToString();
      }, '');
    })
    .then(longString => {
      const a = document.createElement('a');
      const file = new Blob([longString], {type: 'text/plain'});
      a.href = window.URL.createObjectURL(file);
      a.download = 'toAnki';
      a.click();
    })
    .catch(error => {
      console.log(error);

    });

  });

}
