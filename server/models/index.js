/**
 * {
 * 	"name": "DBconnection",
 * 	"version": "1.0.0",
 * 	"discription": "Connect to Mongo DB",
 * 	"author": "Zenar",
 * 	"history": [
 * 		{
 * 			"date": "18-03-16, FRI"
 * 			"version": "1.0.0"
 * 			"discription": "Hello World!"
 * 		}
 * 	]
 * }
 */


let mongoose = require('mongoose'),
	session = require('express-session');

module.exports = app => {
	mongoose.connect('mongodb://zenar:prsgod3467@ds113179.mlab.com:13179/node_test', {
		useMongoClient: true
	});

	let db = mongoose.connection;
	db.on('error', console.error);
	db.once('open', () => {
		console.info('Connected to Mongo Server');
	});

	app.use(session({
		secret: 'ProjectZ!1@2#3$4',
		resave: false,
		saveUninitialized: true
	}));
}