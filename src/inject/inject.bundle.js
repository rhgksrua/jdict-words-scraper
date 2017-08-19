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


var _Extractor = __webpack_require__(3);

var _Extractor2 = _interopRequireDefault(_Extractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractor = new _Extractor2.default(chrome);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Extractor = function () {
  function Extractor(chrome) {
    _classCallCheck(this, Extractor);

    this.chrome = chrome;
    this.setElement();
    this.attachListener();
    this.entryElements;
  }

  _createClass(Extractor, [{
    key: 'storeWord',
    value: function storeWord(payload) {
      var _this = this;

      this.chrome.storage.local.get('words', function (items) {
        console.log('items', items);
        if (!items.words) {
          items = {
            words: []
          };
        }
        items.words.push(payload);
        var newPayload = {
          words: items.words
        };
        _this.chrome.storage.local.set(newPayload, function () {
          console.log('stored', newPayload);
        });
      });
    }
  }, {
    key: 'postMessage',
    value: function postMessage(payload) {
      // send to extension
      this.chrome.runtime.sendMessage(payload, function (response) {
        console.log('word sent!');
      });
    }
  }, {
    key: 'setElement',
    value: function setElement() {
      var classNames = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '.srch_top';

      var el = document.querySelectorAll(classNames);
      if (el.length <= 0) return;
      this.entryElements = el;
    }
  }, {
    key: 'parseText',
    value: function parseText(text) {
      //this.setText
      // returns kanji and furi

      var furi = '';
      var kanji = '';

      var re = /(.+)\[(.+)\]/;
      var matches = text.match(re);

      if (!matches && text.length > 0) {
        furi = text;
        kanji = '';
        return { furi: furi, kanji: kanji };
      } else if (matches.length > 2) {
        furi = matches[1];
        kanji = matches[2];
      }
      return { furi: furi, kanji: kanji };
    }
  }, {
    key: 'nodeListToArray',
    value: function nodeListToArray(list) {
      return Array.prototype.slice.call(list);
    }
  }, {
    key: 'attachListener',
    value: function attachListener() {
      var _this2 = this;

      if (this.entryElements.length <= 0) {
        console.warn('failed to find element');
        return;
      }

      this.entryElements.forEach(function (el) {
        var addElement = document.createElement('span');
        addElement.innerHTML = '\u2795';
        addElement.style.cursor = 'pointer';

        // attach event listner

        addElement.addEventListener('click', function (e) {
          var parent = e.target.parentElement;
          var rawText = parent.firstElementChild.textContent;
          var parentOfParent = parent.parentElement;
          var meaningElements = _this2.nodeListToArray(parentOfParent.querySelectorAll('.lst_txt'));
          var meaningArr = meaningElements.map(function (el) {
            return el.textContent;
          });

          var _parseText = _this2.parseText(rawText),
              furi = _parseText.furi,
              kanji = _parseText.kanji;

          var payload = {
            kanji: kanji, furi: furi, meaning: meaningArr
          };

          _this2.storeWord(payload);
          _this2.postMessage(payload);
        });

        el.appendChild(addElement);
      });
    }
  }]);

  return Extractor;
}();

exports.default = Extractor;

/***/ })
/******/ ]);