/**
 * {
 * 	"name": "Main-Controller",
 * 	"version": "1.0.0",
 * 	"discription": "Base on the Sub-Controllers",
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


let express = require('express');

class Controller {
	constructor(basePath){
		this.prvBase = basePath;
		this.prvRouter = express.Router();
	}

	loadView(res, file, data = {}){
		
		res.render(file, data);
	}

	get basePath(){
		return this.prvBase;
	}

	get router(){
		return this.prvRouter;
	}
}

module.exports = Controller;