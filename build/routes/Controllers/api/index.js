'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Controller = require('../../__Main');

var ApiController = function (_Controller) {
		_inherits(ApiController, _Controller);

		function ApiController(basePath) {
				_classCallCheck(this, ApiController);

				var _this = _possibleConstructorReturn(this, (ApiController.__proto__ || Object.getPrototypeOf(ApiController)).call(this, basePath));

				var Account = require('./account');
				var Memo = require('./memo');

				Account = new Account('account');
				Memo = new Memo('memo');

				_this.router.use('/account', Account.router);
				_this.router.use('/memo', Memo.router);
				return _this;
		}

		return ApiController;
}(Controller);

module.exports = ApiController;