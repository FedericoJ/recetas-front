const express = require('express'); 
const router = express.Router();
const auth = require('../../middleware/auth'); 
const AuthValidator = require('../../validators/AuthValidator'); 
const AuthController = require('../../controllers/AuthController');

//@route    GET api/auth
//@desc     Get User
//@access   Private
router.get('/', auth, AuthController.GetUser); 

//@route    POST api/auth
//@desc     Authenticate User & Get Token
//@access   Public
router.post('/',AuthValidator.AuthValidator, AuthController.Authenticate);

//@route    POST api/auth/ChangePassword
//@desc     Update User Password
//@access   Private
router.post('/ChangePassword',AuthValidator.AuthValidator, auth,AuthController.ChangePassword);

module.exports = router;