import WordList from './WordList';
/*
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log(message);
    // need to add message to localstorage and display on the browser page
  }
);
*/

const parent = document.querySelector('.word-list');
const wordList = new WordList(chrome, parent, document);
