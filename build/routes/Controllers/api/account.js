'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('../../__Main');
var Model = require('../../../models/account');

var AccountController = function (_Controller) {
  _inherits(AccountController, _Controller);

  function AccountController(basePath) {
    _classCallCheck(this, AccountController);

    var _this = _possibleConstructorReturn(this, (AccountController.__proto__ || Object.getPrototypeOf(AccountController)).call(this, basePath));

    _this.router.post('/signup', function (req, res) {
      _this.signup(req, res);
    });
    _this.router.post('/signin', function (req, res) {
      _this.signin(req, res);
    });
    _this.router.post('/logout', function (req, res) {
      _this.logout(req, res);
    });
    _this.router.get('/getinfo', function (req, res) {
      _this.getinfo(req, res);
    });
    _this.router.get('/search/:user', function (req, res) {
      _this.serach(req, res);
    });
    return _this;
  }

  _createClass(AccountController, [{
    key: 'signup',
    value: function signup(req, res) {
      /*
      	ACCOUNT SIGNUP: POST /api/account/signup
        	BODY SAMPLE: { "username": "test", "password": "test" }
        	ERROR CODES:
        	    1: BAD USERNAME
        	    2: BAD PASSWORD
        	    3: USERNAME EXISTS
        */

      // 0. Get Requested Form
      var Username = req.body.username,
          Password = req.body.password;

      // 1. Check Username (no Special Char)
      var usernameRegex = /^[a-z0-9]+$/;

      if (!usernameRegex.test(Username)) {
        return res.status(400).json({
          error: "BAD USERNAME",
          code: 1
        });
      }

      // 2. Check Password
      if (Password.length < 4 || typeof Password !== "string") {
        return res.status(400).json({
          error: "BAD PASSWORD",
          code: 2
        });
      }

      // 3. Check Username Exists
      Model.findOne({ username: Username }, function (err, result) {
        if (err) throw err;

        if (result) {
          return res.status(400).json({
            error: "USERNAME EXISTS",
            code: 3
          });
        }
      });

      // 4. Create Account
      var account = new Model({
        username: Username,
        password: Password
      });

      account.password = account.generateHash(account.password);

      account.save(function (err) {
        if (err) throw err;
        return res.json({ success: true });
      });
    }
  }, {
    key: 'signin',
    value: function signin(req, res) {
      /*
          ACCOUNT SIGNIN: POST /api/account/signin
          BODY SAMPLE: { "username": "test", "password": "test" }
          ERROR CODES:
              1: LOGIN FAILED
      */

      // 1. Password Is String?
      if (typeof req.body.password !== "string") {
        return res.status(401).json({
          error: "LOGIN FAILED",
          code: 1
        });
      }

      // 2. Is It Correctly Data?
      Model.findOne({ username: Username }, function (err, result) {
        if (err) throw err;

        if (!result) {
          return res.status(401).json({
            error: "LOGIN FAILED",
            code: 1
          });
        }
      });

      // 3. Then, Logging Session
      var session = req.session;
      session.loginInfo = {
        _id: account._id,
        username: account.username
      };

      return res.json({
        success: true
      });
    }
  }, {
    key: 'logout',
    value: function logout(req, res) {
      /*
        ACCOUNT LOGOUT: POST /api/accout/logout
       */

      // Destroy Session
      req.session.destroy(function (err) {
        if (err) throw err;
      });

      return res.json({
        success: true
      });
    }
  }, {
    key: 'getinfo',
    value: function getinfo(req, res) {
      /*
        GET USER INFO: GET /api/account/getInfo
       */

      // Get User Info For Login Session
      if (typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
          error: 1
        });
      }

      res.json({
        info: req.session.loginInfo
      });
    }
  }, {
    key: 'search',
    value: function search(req, res) {
      /*
        SEARCH CURRECT USER: GET /api/search/:username
       */

      var re = new RegExp('^' + req.params.username);
      Model.find({
        username: {
          $regex: re
        }
      }, {
        _id: false,
        username: true
      }.limit(5).sort({
        username: 1
      }).exec(function (err, result) {

        if (err) throw err;

        res.json(result);
      }));
    }
  }]);

  return AccountController;
}(Controller);

module.exports = AccountController;