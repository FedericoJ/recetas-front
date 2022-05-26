const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const UserController = require('../../controllers/UserController')
const UserValidator = require('../../validators/UserValidator');

// @route   GET api/users/me
// @desc    Get Current User Profile
// @access  Public

router.get('/me', auth, UserController.GetMyProfile);

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', UserValidator.ValidateRegister, UserController.Register);

// @route   PUT api/users
// @desc    Update  User
// @access  Private
router.put('/updateUser',auth, UserController.UpdateUser);


module.exports = router;