import { setWordsToStorage } from './storage';
// handles rendering of wordlist


class Display {
  constructor(parent) {
    this.parent = parent;
  }
  render(wordList) {
    console.log('render');
    this._clearAllChildren();
    // create and attach new element to list
    const key = ['furi', 'kanji', 'meaning'];
    const frag = document.createDocumentFragment();

    wordList.getWordList().forEach((word, index) => {
      const wordElement = document.createElement('div');
      wordElement.className = 'columns is-mobile word';
      wordElement.dataset.index = index;
      key.forEach(key => {
        const div = document.createElement('div');
        div.className = 'column ' + key;
        div.textContent = word[key];
        wordElement.appendChild(div);
      })
      // remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'button is-danger remove';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', e => {
        console.log('remember to remove this word when clicked');
        console.log(e);
        const index = e.target.parentElement.dataset.index;
        wordList.removeWord(index);
        setWordsToStorage(wordList);
        this.render(wordList);
      });
      wordElement.appendChild(removeBtn);
      const wordContainer = document.createElement('div');
      wordContainer.className = 'container';
      wordContainer.appendChild(wordElement);
      frag.appendChild(wordContainer);
    });
    this.parent.appendChild(frag);
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
