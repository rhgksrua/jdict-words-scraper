import { setWordsToStorage } from './storage';

class Display {
  constructor(parent, wordList) {
    this.parent = parent;
    this.wordList = wordList;
    this._attachRemoveDelegate(wordList);
  }
  _attachRemoveDelegate(wordList) {
    this.parent.addEventListener('click', e => {
      if (e.target && e.target.nodeName === 'BUTTON') {
        const index = e.target.parentElement.parentElement.dataset.index;
        wordList.removeWord(index);
        setWordsToStorage(wordList);
        this.render(wordList);
      }
    });
  }
  _createInnerHTML(arrWordList) {
    const keys = ['furi', 'kanji', 'meaning'];

    let finalHTML = '';
    let containerHTML = '';

    arrWordList.forEach((word, index) => {
      let wordListHTML = '';
      keys.forEach(key => {
        wordListHTML += `
          <div class="column ${key}">
            <p>
              ${word[key]}
            </p>
          </div>
        `;
      });
      containerHTML += `
        <div data-index="${index}" class="columns is-mobile word">
          ${wordListHTML}
          <div class="column">
            <button class="button is-danger">REMOVE</button>
          </div>
        </div>
      `;
    });

    finalHTML = `
      <div class="container">
        ${containerHTML}
      </div>
    `;

    return finalHTML;
  }
  render(wordList) {
    this._clearAllChildren();
    const listHTML = this._createInnerHTML(wordList.getWordList());
    this.parent.innerHTML = listHTML;
  }
  /**
   * Clears all children in the parent element
   */
  _clearAllChildren() {
    while(this.parent.firstChild) {
      this.parent.removeChild(this.parent.firstChild);
    }
  }
}

export default Display;
