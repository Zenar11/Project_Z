/**
 * {
 * 	"name": "Server Listener",
 * 	"version": "1.0.0",
 * 	"discription": "Listening to the Server",
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

let express = require(`${__dirname}/config/express-config`);

let http = require('http');


let app = express();
let PORT = app.get('PORT');

http.createServer(app).listen(PORT, callback =>{
	console.info(`Welcome!`);
	console.log(`Server listen in port:${PORT}`);
});

module.exports = app;