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

let express = require(`${__dirname}/config/express`);

let app = express();
let PORT = app.get('PORT');

app.listen(PORT, () => {
	console.log(`Express Server is listening on Port ${PORT}`);
});

if(process.env.NODE_ENV == 'development'){
	let devServer = require('./main.dev');
	devServer(app);
}


module.exports = app;