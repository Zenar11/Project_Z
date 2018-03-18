'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mongoose = require('mongoose');
var Controller = require('../../__Main');
var Model = require('../../../models/memo');

var AccountController = function (_Controller) {
  _inherits(AccountController, _Controller);

  function AccountController(basePath) {
    _classCallCheck(this, AccountController);

    var _this = _possibleConstructorReturn(this, (AccountController.__proto__ || Object.getPrototypeOf(AccountController)).call(this, basePath));

    _this.router.post('/', function (req, res) {
      _this.index(req, res);
    });
    _this.router.put('/:id', function (req, res) {
      _this.modify(req, res);
    });
    _this.router.delete('/:id', function (req, res) {
      _this.delete(req, res);
    });
    _this.router.get('/', function (req, res) {
      _this.readMemo(req, res);
    });
    return _this;
  }

  _createClass(AccountController, [{
    key: 'index',
    value: function index(req, res) {
      /*
        WRITE MEMO: POST /api/memo
        BODY SAMPLE: { contents: "sample "}
        ERROR CODES
            1: NOT LOGGED IN
            2: EMPTY CONTENTS
      */

      // 1. Check Login Statue
      if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
          error: "NOT LOGGED IN",
          code: 1
        });
      }

      // 2. Check Form
      if (typeof req.body.contents !== 'string' || req.body.contents === "") {
        return res.status(400).json({
          error: "EMPTY CONTENTS",
          code: 2
        });
      }

      // 3. Create New Memo
      var memo = new Model({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
      });

      // 4. Save Memo
      memo.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
      });
    }
  }, {
    key: 'modify',
    value: function modify(req, res) {
      /*
          MODIFY MEMO: PUT /api/memo/:id
          BODY SAMPLE: { contents: "sample "}
          ERROR CODES
              1: INVALID ID,
              2: EMPTY CONTENTS
              3: NOT LOGGED IN
              4: NO RESOURCE
              5: PERMISSION FAILURE
      */

      // 1. Check Memo ID
      if (!mongoose.Types.ObjectId.isVaild(req.params.id)) {
        return res.status(400).json({
          error: "INVALID ID",
          code: 1
        });
      }

      // 2. Check Contents vaild
      if (typeof req.body.contents !== 'string' || req.body.contents === "") {
        return res.status(400).json({
          error: "EMPTY CONTENTS",
          code: 2
        });
      }

      // 3. Check Login Status
      if (typeof req.session.loginInfo === 'undefined') {
        return res.status(400).json({
          error: "NOT LOGGED IN",
          code: 3
        });
      }

      // 4. Find Memo
      Model.findById(req.params.id, function (err, result) {
        if (err) throw err;

        // 5. If memo does not Exist
        if (!result) {
          return res.status(404).json({
            error: "NO RESOURCE",
            code: 4
          });
        }

        // 6. Compare Memo's Writer With Session
        if (memo.writer != req.session.loginInfo.username) {
          return res.status(403).json({
            error: "PERMISSION FAILURE",
            code: 5
          });
        }

        // Modify and save
        memo.contents = req.body.contents;
        memo.date.edited = new Date();
        memo.is_edited = true;

        memo.save(function (err, result) {
          if (err) throw err;

          return res.json({
            success: true,
            memo: result
          });
        });
      });
    }
  }, {
    key: 'delete',
    value: function _delete(req, res) {
      /*
          DELETE MEMO: DELETE /api/memo/:id
          ERROR CODES
              1: INVALID ID
              2: NOT LOGGED IN
              3: NO RESOURCE
              4: PERMISSION FAILURE
      */

      // 1. Check Memo ID
      if (!mongoose.Types.ObjectId.isVaild(req.params.id)) {
        return res.status(400).json({
          error: "INVALID ID",
          code: 1
        });
      }

      // 2. Check Login Status
      if (typeof req.session.loginInfo === 'undefined') {
        return res.status(400).json({
          error: "NOT LOGGED IN",
          code: 2
        });
      }

      // 4. Find Memo
      Model.findById(req.params.id, function (err, result) {
        if (err) throw err;

        // 5. If memo does not Exist
        if (!result) {
          return res.status(404).json({
            error: "NO RESOURCE",
            code: 3
          });
        }

        // 6. Compare Memo's Writer With Session
        if (memo.writer != req.session.loginInfo.username) {
          return res.status(403).json({
            error: "PERMISSION FAILURE",
            code: 4
          });
        }

        // Remove
        Model.remove({ _id: req.params.id }, function (err) {
          if (err) throw err;
          res.json({ success: true });
        });
      });
    }
  }, {
    key: 'readMemo',
    value: function readMemo(req, res) {
      /*
          READ MEMO: GET /api/memo
      */

      Model.find().sort({ "_id": -1 }).limit(6).exec(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
    }
  }]);

  return AccountController;
}(Controller);

module.exports = AccountController;