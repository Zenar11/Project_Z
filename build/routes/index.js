'use strict';

/**
 * {
 * 	"name": "Controller-Loader",
 * 	"version": "1.0.0",
 * 	"discription": "Load Controllers",
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

var fs = require('fs');
var path = require('path');

module.exports = function (app) {

  // 1. Define Object will be stored by Controllers.
  var controllerList = {};

  // 2. Load Controllers
  var ControllerPath = path.join(__dirname, '/Controllers');

  fs.readdirSync(ControllerPath).forEach(function (file) {

    // 3. Path's name will be Controller's filename.
    var basePath = path.basename(file, ".js");
    var Controller = require(ControllerPath + '/' + file);
    controllerList[basePath] = new Controller(basePath);

    // 4. Register Controller.
    app.use('/' + basePath, controllerList[basePath].router);
  });

  // 5. Setting Default Controller.
};