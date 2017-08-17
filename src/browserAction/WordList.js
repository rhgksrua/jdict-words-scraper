
class WordList {
  constructor(chrome, parent, document) {
    console.log('WordList');

    this.chrome = chrome;
    this.doc = document;

    // list element that displays all words added
    this.parentElement = parent;

    // load all words from storage.
    // also add onChange event listner for storage.
    // if words are added

    // List of all words
    this.wordList;

    // fragment
    this.frag = this.doc.createDocumentFragment();

    // stores all current words from the list.
    chrome.storage.local.get('words', ({ words }) => {
      this.wordList = words;
      console.log('--- this wordlist', this.wordList);
      this._createWordElements();
    });
  }
  _createWordElements() {

    // key for the item/object in storage
    const key = ['furi', 'kanji', 'meaning'];

    this.wordList.forEach((word, index) => {
      const wordElement = this.doc.createElement('p');
      wordElement.className = 'word';
      //wordElement.setAttribute('date-index', index);
      wordElement.dataset.index = index;
      key.forEach(key => {
        const span = this.doc.createElement('span');
        span.className = key;
        span.textContent = word[key];
        wordElement.appendChild(span);
      })

      this.frag.appendChild(wordElement);
    });

    console.log('attaching frag');
    this.parentElement.appendChild(this.frag)

  }


}

export default WordList;
