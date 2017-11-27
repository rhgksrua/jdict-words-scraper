class Extractor {
  constructor(chrome) {
    this.chrome = chrome;
    this.setElement();
    this.attachListener();
    this.entryElements;
  }
  storeWord(payload) {
    this.chrome.storage.local.get('words', items => {
      console.log('items', items);
      if (!items.words) {
        items = {
          words: []
        };
      }
      items.words.push(payload);
      const newPayload = {
        words: items.words
      };
      this.chrome.storage.local.set(newPayload, () => {
        console.log('stored', newPayload);
      });

    })
  }
  postMessage(payload) {
    // send to extension
    this.chrome.runtime.sendMessage(payload, response => {
      console.log('word sent!');
    });

  }
  setElement(classNames = '.srch_top') {
    const el = document.querySelectorAll(classNames);
    if (el.length <= 0) return;
    this.entryElements = el;
  }
  parseText(text) {
    //this.setText
    // returns kanji and furi

    let furi = '';
    let kanji = '';

    const re = /(.+)\[(.+)\]/;
    const matches = text.match(re);

    if (!matches && text.length > 0) {
      furi = text;
      kanji = '';
      return { furi, kanji };
    } else if (matches.length > 2) {
      furi = matches[1];
      kanji = matches[2];
    }
    return { furi, kanji };
  }
  nodeListToArray(list) {
    return Array.prototype.slice.call(list);
  }
  attachListener() {
    if (this.entryElements.length <= 0) {
      console.warn('failed to find element');
      return;
    }


    this.entryElements.forEach(el => {
      const addElement = document.createElement('span');
      addElement.innerHTML = '\u2795';
      addElement.style.cursor = 'pointer';

      // attach event listner

      addElement.addEventListener('click', e => {
        const parent = e.target.parentElement;
        const rawText = parent.firstElementChild.textContent;
        const parentOfParent = parent.parentElement;
        const meaningElements = this.nodeListToArray(parentOfParent.querySelectorAll('.lst_txt'));
        const meaningArr = meaningElements.map(el => {
          return el.textContent;
        });

        const { furi, kanji } = this.parseText(rawText);
        const payload = {
          kanji, furi, meaning: meaningArr
        };

        this.storeWord(payload);
        this.postMessage(payload);

      });

      el.appendChild(addElement);

    });

  }
}

export default Extractor;
