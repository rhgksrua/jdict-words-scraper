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


      const wordElement = document.createElement('p');
      wordElement.className = 'word';
      wordElement.dataset.index = index;
      key.forEach(key => {
        const span = document.createElement('span');
        span.className = key;
        span.textContent = word[key];
        wordElement.appendChild(span);
      })

      // remove button
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove';
      removeBtn.textContent = 'Remove';

      removeBtn.addEventListener('click', e => {
        console.log('remember to remove this word when clicked');
        console.log(e);
        const index = e.target.parentElement.dataset.index;
        // remove element from word list
        //
        wordList.removeWord(index);
        setWordsToStorage(wordList);
        this.render(wordList);

        //this._createWordElements();

      });

      wordElement.appendChild(removeBtn);
      frag.appendChild(wordElement);

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
