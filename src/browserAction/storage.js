import Word from './Word';
/**
 * returns stored word list from storage.local
 * @return Promise
 */
export const getWordsFromStorage = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('words', ({ words }) => {
      if (!words) {
        words = [];
      }
      resolve(words);
    });
  })
}

export const setWordsToStorage = wordList => {
  const payload = {
    words: wordList.toStorage()
  };
  chrome.storage.local.set(payload, () => {
    console.log('saved');
  });
}

export const resetStorage = () => {
  chrome.storage.local.remove("words", () => {
    console.log('reset');
  });
}
