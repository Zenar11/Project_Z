
let Controller = require('../../__Main');
let Model = require('../../../models/account');

class AccountController extends Controller{
	constructor(basePath) {
		super(basePath);

		this.router.post('/signup', (req, res) => {this.signup(req, res)});
		this.router.post('/signin', (req, res) => {this.signin(req, res)});
		this.router.post('/logout', (req, res) => {this.logout(req, res)});
		this.router.get('/getinfo', (req, res) => {this.getinfo(req, res)});
		this.router.get('/search/:user', (req, res) => {this.serach(req, res)});
	}

	signup(req, res) {
		/*
			ACCOUNT SIGNUP: POST /api/account/signup
    	BODY SAMPLE: { "username": "test", "password": "test" }
    	ERROR CODES:
    	    1: BAD USERNAME
    	    2: BAD PASSWORD
    	    3: USERNAME EXISTS
    */
    
   
      // 0. Get Requested Form
      let Username = req.body.username,
          Password = req.body.password;
    
      // 1. Check Username (no Special Char)
      let usernameRegex = /^[a-z0-9]+$/;
  
      if(!usernameRegex.test(Username)) {
        return res.status(400).json({
          error: "BAD USERNAME",
          code: 1
        });
      }
	
   		// 2. Check Password
   		if(Password.length < 4 || typeof Password !== "string") {
   			return res.status(400).json({
   				error: "BAD PASSWORD",
   				code: 2
   			});
   		}
	
   		// 3. Check Username Exists
   		Model.findOne({username: Username}, (err, result) => {
   			if (err) throw err;

   			if (result) {
   				return res.status(400).json({
   					error: "USERNAME EXISTS",
   					code: 3
   				});
   			}
   		});

   		// 4. Create Account
   		let account = new Model({
   			username: Username,
   			password: Password
   		});

   		account.password = account.generateHash(account.password);

   		account.save(err => {
   			if (err) throw err;
   			return res.json({success: true});
   		});
	}

	signin(req, res) {
    /*
        ACCOUNT SIGNIN: POST /api/account/signin
        BODY SAMPLE: { "username": "test", "password": "test" }
        ERROR CODES:
            1: LOGIN FAILED
    */
    
    let Username = req.body.username,
        Password = req.body.password;
    
    // 1. Password Is String?
    if (typeof Password !== "string") {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // 2. Is It Correctly Data?
    Model.findOne({username: Username}, (err, result) => {
      if (err) throw err;

      if (!result) {
        return res.status(401).json({
          error: "LOGIN FAILED",
          code: 1
        });
      }

      // 2.5. Password is Vaild?
      if (!result.validateHash(Password)) {
        return res.status(401).json({
          error: "LOGIN FAILED",
          code: 1
        });
      }

      // 3. Then, Logging Session
      /*
        Why Here? 
        Because the cooki must define after DB LOAD
       */
      
      let session = req.session;
      session.loginInfo = {
        _id: result._id,
        username: result.username
      };
  
      return res.json({
        success: true
      });
    });

	}

	logout(req, res) {
    /*
      ACCOUNT LOGOUT: POST /api/accout/logout
     */
    
    // Destroy Session
		req.session.destroy(err => {
      if (err) throw err;
    });

    return res.json({
      success: true
    });
	}

	getinfo(req, res) {
    /*
      GET USER INFO: GET /api/account/getInfo
     */
    
    // Get User Info For Login Session
    if (typeof req.session.loginInfo === 'undefined') {
      return res.status(401).json({
        error: 1
      });
    }

    res.json({
      info: req.session.loginInfo
    });
	}

	search(req, res) {
    /*
      SEARCH CURRECT USER: GET /api/search/:username
     */
    
    let re = new RegExp(`^${req.params.username}`);
    Model.find({ username: { $regex: re } },{ _id: false, username: true }.limit(5).sort({ username: 1 }).exec((err, result) => {
      if (err) throw err;

      res.json(result);
    }));
	}
}

module.exports = AccountController;