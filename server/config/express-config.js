/**
 * {
 * 	"name": "Express-Config",
 * 	"version": "1.0.0",
 * 	"discription": "Configuration of Express FrameWork.",
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

let express = require('express'),
	bodyParser = require('body-parser'),
	ejs = require('ejs'),
	path = require('path');

module.exports = () => {
	// 1. Load Express FrameWorks
	let app = express();

	// 2. Load Server Configuration
	let config = require(path.join(__dirname, '/server.default.setting.json'));

	// 2.5. Setting Server Listening Port
	app.set('PORT', process.env.PORT || config.server.port || 8080);

	// 3. Include Body-Parser
	app.use(bodyParser.urlencoded({
		extended:true
	}));
	app.use(bodyParser.json());

	// 4. View Engine
	app.set('views', path.join(__dirname, '..', '..', '/app/views'));

	app.set('view engine', 'ejs');

	return app;
};
