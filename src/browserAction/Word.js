
class Word {
  constructor(furi, kanji, meaning) {
    this.furi = furi;
    this.kanji = kanji;
    this.meaning = meaning;
  }

  wordToString() {
    return `${this.furi}  ${this.kanji} ${this.meaning}`;
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
