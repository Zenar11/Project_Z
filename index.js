/**
 * {
 * 	"name": "PROJECT Z",
 * 	"version": "0.0.1",
 * 	"discription": "This is Zenar's Blog",
 * 	"author": "Zenar",
 * 	"history": [
 * 		{
 * 			"date": "18-03-15, FRI"
 * 			"version": "0.0.1"
 * 			"discription": "Hello World!"
 * 		}
 * 	]
 * }
 */


// 1. Load Server
let server = require(`${__dirname}/server/server.js`);

// 2. Load controller_loader
let Controller = require(`${__dirname}/server/loader/ControllerLoader`);
Controller = Controller(server);