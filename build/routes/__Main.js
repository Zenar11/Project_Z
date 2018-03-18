'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * {
 * 	"name": "Main-Controller",
 * 	"version": "1.0.0",
 * 	"discription": "Base on the Sub-Controllers",
 * 	"author": "Zenar",
 * 	"history": [
 * 		{
 * 			"date": "18-03-15, FRI"
 * 			"version": "1.0.0"
 * 			"discription": "Hello World!"
 * 		}
 * 	]
 * }
 */

var express = require('express');

var Controller = function () {
  function Controller(basePath) {
    _classCallCheck(this, Controller);

    this.prvBase = basePath;
    this.prvRouter = express.Router();
  }

  _createClass(Controller, [{
    key: 'basePath',
    get: function get() {
      return this.prvBase;
    }
  }, {
    key: 'router',
    get: function get() {
      return this.prvRouter;
    }
  }]);

  return Controller;
}();

module.exports = Controller;