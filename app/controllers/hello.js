let Controller = require('../MainController');

class Hello extends Controller{
	constructor(basePath){
		super(basePath);

		this.router.get("/", (req, res) => { this.index(req, res) });
	}

	index(req, res){
		this.loadView(res, 'test1');
	}
}

module.exports = Hello
