'use strict';

var mongoose = require('mongoose'),
    bcryptjs = require('bcryptjs'),
    crypto = require('crypto');

var Schema = mongoose.Schema;

var Account = new Schema({
	username: String,
	password: String,
	created: {
		type: Date,
		default: Date.now
	}
});

Account.methods.generateHash = function (password) {
	return bcryptjs.hashSync(password, 8);
};

Account.methods.validateHash = function (password) {
	return bcryptjs.compareSync(password, this.password);
};

module.exports = mongoose.model('account', Account);