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


var _WordList = __webpack_require__(3);

var _WordList2 = _interopRequireDefault(_WordList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    console.log(message);
    // need to add message to localstorage and display on the browser page
  }
);
*/

var parent = document.querySelector('.word-list');
var wordList = new _WordList2.default(chrome, parent, document);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WordList = function () {
    function WordList(chrome, parent, document) {
        var _this = this;

        _classCallCheck(this, WordList);

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
        chrome.storage.local.get('words', function (_ref) {
            var words = _ref.words;

            _this.wordList = words;
            console.log('--- this wordlist', _this.wordList);
            _this._createWordElements();
        });
    }

    _createClass(WordList, [{
        key: '_createWordElements',
        value: function _createWordElements() {
            var _this2 = this;

            // key for the item/object in storage
            var key = ['furi', 'kanji', 'meaning'];

            this.wordList.forEach(function (word, index) {
                var wordElement = _this2.doc.createElement('p');
                wordElement.className = 'word';
                //wordElement.setAttribute('date-index', index);
                wordElement.dataset.index = index;
                key.forEach(function (key) {
                    var span = _this2.doc.createElement('span');
                    span.className = key;
                    span.textContent = word[key];
                    wordElement.appendChild(span);
                });

                _this2.frag.appendChild(wordElement);
            });

            console.log('attaching frag');
            this.parentElement.appendChild(this.frag);
        }
    }]);

    return WordList;
}();

exports.default = WordList;

/***/ })
/******/ ]);