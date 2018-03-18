
let mongoose = require('mongoose');
let Controller = require('../../__Main');
let Model = require('../../../models/memo');

class AccountController extends Controller{
	constructor(basePath) {
		super(basePath);

		this.router.post('/', (req, res) => {this.index(req, res)});
		this.router.put('/:id', (req, res) => {this.modify(req, res)});
		this.router.delete('/:id', (req, res) => {this.delete(req, res)});
		this.router.get('/', (req, res) => {this.readMemo(req, res)});
    this.router.get('/:listType:id', (req, res) => {this.readAdditional(req, res)});
	}

  index(req, res) {
    /*
      WRITE MEMO: POST /api/memo
      BODY SAMPLE: { contents: "sample "}
      ERROR CODES
          1: NOT LOGGED IN
          2: EMPTY CONTENTS
    */

    // 1. Check Login Statue
    if (typeof req.session.loginInfo === 'undefined') {
      return res.status(403).json({
        error: "NOT LOGGED IN",
        code: 1
      });
    }

    // 2. Check Form
    if (typeof req.body.contents !== 'string' || req.body.contents === "") {
      return res.status(400).json({
        error: "EMPTY CONTENTS",
        code: 2
      });
    }

    // 3. Create New Memo
    let memo = new Model({
      writer: req.session.loginInfo.username,
      contents: req.body.contents
    });

    // 4. Save Memo
    memo.save( err => {
      if (err) throw err;
      return res.json({success: true});
    });
  }

  modify(req, res) {
    /*
        MODIFY MEMO: PUT /api/memo/:id
        BODY SAMPLE: { contents: "sample "}
        ERROR CODES
            1: INVALID ID,
            2: EMPTY CONTENTS
            3: NOT LOGGED IN
            4: NO RESOURCE
            5: PERMISSION FAILURE
    */
   
    // 1. Check Memo ID
    if (!mongoose.Types.ObjectId.isVaild(req.params.id)) {
      return res.status(400).json({
        error: "INVALID ID",
        code: 1
      });
    }
  
    // 2. Check Contents vaild
    if(typeof req.body.contents !== 'string' || req.body.contents === "") {
      return res.status(400).json({
        error: "EMPTY CONTENTS",
        code: 2
      });
    }

    // 3. Check Login Status
    if (typeof req.session.loginInfo === 'undefined') {
      return res.status(400).json({
        error: "NOT LOGGED IN",
        code: 3
      });
    }

    // 4. Find Memo
    Model.findById(req.params.id, (err, result) => {
      if (err) throw err;

      // 5. If memo does not Exist
      if (!result) {
        return res.status(404).json({
          error: "NO RESOURCE",
          code: 4
        });
      }

      // 6. Compare Memo's Writer With Session
      if (memo.writer != req.session.loginInfo.username) {
        return res.status(403).json({
          error: "PERMISSION FAILURE",
          code: 5
        });
      }

      // Modify and save
      memo.contents = req.body.contents;
      memo.date.edited = new Date();
      memo.is_edited = true;

      memo.save((err, result) => {
        if (err) throw err;

        return res.json({
          success: true,
          memo: result
        });
      });
    });
  }
  delete(req, res) {
    /*
        DELETE MEMO: DELETE /api/memo/:id
        ERROR CODES
            1: INVALID ID
            2: NOT LOGGED IN
            3: NO RESOURCE
            4: PERMISSION FAILURE
    */
    
    // 1. Check Memo ID
    if (!mongoose.Types.ObjectId.isVaild(req.params.id)) {
      return res.status(400).json({
        error: "INVALID ID",
        code: 1
      });
    }

    // 2. Check Login Status
    if (typeof req.session.loginInfo === 'undefined') {
      return res.status(400).json({
        error: "NOT LOGGED IN",
        code: 2
      });
    }

    // 4. Find Memo
    Model.findById(req.params.id, (err, result) => {
      if (err) throw err;

      // 5. If memo does not Exist
      if (!result) {
        return res.status(404).json({
          error: "NO RESOURCE",
          code: 3
        });
      }

      // 6. Compare Memo's Writer With Session
      if (memo.writer != req.session.loginInfo.username) {
        return res.status(403).json({
          error: "PERMISSION FAILURE",
          code: 4
        });
      }

      // Remove
      Model.remove({ _id: req.params.id }, err => {
        if (err) throw err;
        res.json({ success: true });
      });
    }); 
  }

  readMemo(req, res) {
    /*
        READ MEMO: GET /api/memo
    */
    
    Model.find().sort({ "_id": -1 }).limit(6).exec((err, result) => {
      if (err) throw err;
      res.json(result);
    });
  }

  readAdditional(req, res) {
    /*
        READ ADDITIONAL (OLD/NEW) MEMO: GET /api/memo/:listType/:id
        ERR CODES
            1. INVALID LISTTYPE
            2. INVALID ID
    */
   
    let listType = req.params.listType;
    let id = req.params.id;

    // 1. Check List Type
    if (listType !== 'old' && listType !== 'new') {
      return res.status(400).json({
        error: "INVALID LISTTYPE",
        code: 1
      });
    }

    // 2. Check Memo Id
    if (!mongoose.Types.ObjectId.isVaild(id)) {
      return res.status(400).json({
        error: "INVALID ID",
        code: 2
      });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if (listType === 'new') {
      // get new memo
      Model.find({ _id: { $gt: objId } }).sort({ "_id": -1 }).limit(6).exec((err, result) => {
        if (err) throw err;
        res.json(result);
      });
      
    } else {
      // get old memo
      Model.find({ _id: { $lt: objId } }).sort({ "_id": -1 }).limit(6).exec((err, result) => {
        if (err) throw err;
        res.json(result);
      });
    }

  }

}

module.exports = AccountController;