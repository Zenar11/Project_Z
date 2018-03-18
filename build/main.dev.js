'use strict';

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

var webpackDevServer = require('webpack-dev-server'),
    webpack = require('webpack');

module.exports = function (app) {
  console.info('Server is Running on Dev mode');

  // 1. load Dev webpack configuration
  var config = require('../webpack.dev.config');

  // 2. Set webpack configuration
  var compiler = webpack(config);

  // 3. Load ServerHost module
  var devServer = new webpackDevServer(compiler, config.devServer);

  // 4. DevServer Listen
  var devPort = app.get('dev_Port');
  devServer.listen(devPort, function () {
    console.log('Webpack-Dev-Server is listening on Port ' + devPort);
  });
};