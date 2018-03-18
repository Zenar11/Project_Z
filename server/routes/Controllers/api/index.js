let Controller = require('../../__Main');


class ApiController extends Controller {
	constructor(basePath) {
		super(basePath);


		let Account = require('./account');
		let Memo = require('./memo');

		Account = new Account('account');
		Memo = new Memo('memo');

		this.router.use('/account', Account.router);
		this.router.use('/memo', Memo.router);
	}
}

module.exports = ApiController;