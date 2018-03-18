let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let Memo = new Schema({
	writer: String,
	contents: String,
	starred: [String],
	date: {
		create: {
			type: Date,
			default: Date.now
		},
		edited: {
			type: Date,
			default: Date.now
		}
	},
	is_edited: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('memo', Memo);