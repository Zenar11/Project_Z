/**
 * {
 * 	"name": "Dev_Server Listener",
 * 	"version": "1.0.0",
 * 	"discription": "Listening to the DevServer",
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

let webpackDevServer = require('webpack-dev-server'),
	webpack = require('webpack');

module.exports = app => {
	console.info('Server is Running on Dev mode');

	// 1. load Dev webpack configuration
	let config = require('../webpack.dev.config');

	// 2. Set webpack configuration
	let compiler = webpack(config);

	// 3. Load ServerHost module
	let devServer = new webpackDevServer(compiler, config.devServer);

	// 4. DevServer Listen
	let devPort = app.get('dev_Port');
	devServer.listen(devPort, () => {
		console.log(`Webpack-Dev-Server is listening on Port ${devPort}`);
	});
};