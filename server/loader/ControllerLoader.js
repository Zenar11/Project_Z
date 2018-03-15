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


let fs = require('fs');
let path = require('path');

module.exports = app => {

	// 1. Define Object will be stored by Controllers.
	let controllerList = {};

	// 2. Load Controllers
	let ControllerPath = path.join(__dirname, '..', '..', '/app/controllers');

	fs.readdirSync(ControllerPath).forEach(file => {

		// 3. Path's name will be Controller's filename.
		let basePath = path.basename(file, ".js");
		let Controller = require(`${ControllerPath}/${file}`);
		controllerList[basePath] = new Controller(basePath);

		// 4. Register Controller.
		app.use(`/${basePath}`, controllerList[basePath].router);
	});

	// 5. Setting Default Controller.
	app.use('/', controllerList['hello'].router);

	// 6. Setting Default 404 Errors.
	app.all('*', (req, res) => {
		let code = 404;
		res.status(code).render('error_page',{status:code});
		console.log(res);
	}) 
};