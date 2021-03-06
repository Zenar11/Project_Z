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
	path = require('path'),
	bodyParser = require('body-parser'),
	morgan = require('morgan'),
	connectDB = require('../models'),
	router = require('../routes')

module.exports = () => {
	// 1. Load Express FrameWorks
	let app = express();

	// 2. Load Server Configuration
	let config = require(path.join(__dirname, '/server.default.setting.json'));

	// 2.5. Setting Server Listening Port
	app.set('PORT', config.server.port || 3000);
	app.set('dev_Port', process.env.PORT || config.server.devPort || 4000);

	// 3. Include MiddleWare(Morgan, BodyParser)
	app.use(morgan('dev'));
	app.use(bodyParser.urlencoded({
		extended:false
	}));
	app.use(bodyParser.json());

	// 4. Setting DataBase
	let db = connectDB(app);

	// 5. Controller Loader
	let controller = router(app);

	// 6. React Default Skeleton Load
	app.use('/', express.static(path.join(__dirname, './../public')));

	app.get('*', (req, res) => {
    	res.sendFile(path.resolve(__dirname, '../../', 'public/index.html'));
	});
	

	// 7. Error Handler
	app.use((err, req, res, next) => {
		console.error(err.stack);
		res.status(500).send('500 SERVER_ERROR');
	});

	return app;
};
