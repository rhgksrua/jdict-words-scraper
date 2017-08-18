/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Word = __webpack_require__(5);

var _Word2 = _interopRequireDefault(_Word);

var _WordList = __webpack_require__(3);

var _WordList2 = _interopRequireDefault(_WordList);

var _Display = __webpack_require__(4);

var _Display2 = _interopRequireDefault(_Display);

var _storage = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// handles DOM manipulation
// word
var parent = document.querySelector('.word-list');

// handles chrome storage.local
// returns promise


// Word List


var wordList = new _WordList2.default();
var display = new _Display2.default(parent);

var fetchWordList = (0, _storage.getWordsFromStorage)();
fetchWordList.then(function (words) {
  var wordsArr = words.map(function (word) {
    var furi = word.furi,
        kanji = word.kanji,
        meaning = word.meaning;

    return new _Word2.default(furi, kanji, meaning);
  });
  return wordsArr;
}).then(function (arr) {
  wordList.setWordList(arr);
  display.render(wordList);
}).catch(function (error) {
  console.error(error);
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WordList = function () {
  function WordList(words) {
    _classCallCheck(this, WordList);

    this.wordList = words;
  }

  _createClass(WordList, [{
    key: 'setWordList',
    value: function setWordList(list) {
      this.wordList = list;
    }
  }, {
    key: 'getWordList',
    value: function getWordList() {
      return this.wordList;
    }

    /**
     * converts to array of object
     * @return {[type]} [description]
     */

  }, {
    key: 'toStorage',
    value: function toStorage() {
      var words = this.wordList.map(function (word) {
        return word.toObject();
      });
      return words;
    }
  }, {
    key: 'removeWord',
    value: function removeWord(index) {
      console.log('-- orig wordList', this.wordList);
      this.wordList.splice(index, 1);
      console.log('--- newWordList', this.wordList);
    }
  }]);

  return WordList;
}();

exports.default = WordList;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _storage = __webpack_require__(6);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// handles rendering of wordlist


var Display = function () {
  function Display(parent) {
    _classCallCheck(this, Display);

    this.parent = parent;
  }

  _createClass(Display, [{
    key: 'render',
    value: function render(wordList) {
      var _this = this;

      console.log('render');
      this._clearAllChildren();
      // create and attach new element to list
      var key = ['furi', 'kanji', 'meaning'];

      var frag = document.createDocumentFragment();

      wordList.getWordList().forEach(function (word, index) {

        var wordElement = document.createElement('p');
        wordElement.className = 'word';
        wordElement.dataset.index = index;
        key.forEach(function (key) {
          var span = document.createElement('span');
          span.className = key;
          span.textContent = word[key];
          wordElement.appendChild(span);
        });

        // remove button
        var removeBtn = document.createElement('button');
        removeBtn.className = 'remove';
        removeBtn.textContent = 'X';

        removeBtn.addEventListener('click', function (e) {
          console.log('remember to remove this word when clicked');
          console.log(e);
          var index = e.target.parentElement.dataset.index;
          // remove element from word list
          //
          wordList.removeWord(index);
          (0, _storage.setWordsToStorage)(wordList);
          _this.render(wordList);

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

  }, {
    key: '_clearAllChildren',
    value: function _clearAllChildren() {
      while (this.parent.firstChild) {
        this.parent.removeChild(this.parent.firstChild);
      }
    }
  }]);

  return Display;
}();

exports.default = Display;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Word = function () {
  function Word(furi, kanji, meaning) {
    _classCallCheck(this, Word);

    this.furi = furi;
    this.kanji = kanji;
    this.meaning = meaning;
  }

  _createClass(Word, [{
    key: "wordToString",
    value: function wordToString() {
      return this.furi + "  " + this.kanji + " " + this.meaning;
    }
  }, {
    key: "toObject",
    value: function toObject() {
      return {
        furi: this.furi,
        kanji: this.kanji,
        meaning: this.meaning
      };
    }
  }]);

  return Word;
}();

exports.default = Word;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setWordsToStorage = exports.getWordsFromStorage = undefined;

var _Word = __webpack_require__(5);

var _Word2 = _interopRequireDefault(_Word);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * returns stored word list from storage.local
 * @return Promise
 */
var getWordsFromStorage = exports.getWordsFromStorage = function getWordsFromStorage() {
  return new Promise(function (resolve, reject) {
    chrome.storage.local.get('words', function (_ref) {
      var words = _ref.words;

      if (!words) {
        words = [];
      }
      resolve(words);
    });
  });
};

var setWordsToStorage = exports.setWordsToStorage = function setWordsToStorage(wordList) {
  var payload = {
    words: wordList.toStorage()
  };
  chrome.storage.local.set(payload, function () {
    console.log('saved');
  });
};

/***/ })
/******/ ]);