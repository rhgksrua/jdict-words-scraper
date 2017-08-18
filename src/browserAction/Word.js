
class Word {
  constructor(furi, kanji, meaning) {
    this.furi = furi;
    this.kanji = kanji;
    this.meaning = meaning;
  }

  wordToString() {
    return `${this.kanji}\t\t\t\t${this.kanji}\t${this.furi}\t${this.kanji}\t${this.furi}\t\t${this.meaning}\t\t\n`;
  }



  toObject() {
    return {
      furi: this.furi,
      kanji: this.kanji,
      meaning: this.meaning,
    }
  }
}

export default Word;
