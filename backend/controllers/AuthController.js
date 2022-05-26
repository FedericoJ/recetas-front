const User = require('../models/User');
const bcrypt = require('bcryptjs');
const AuthService = require('../services/AuthService');
const jwt = require('jsonwebtoken');
const config = require('config'); 


//@route    GET api/auth
//@desc     Get User
//@access   Private

exports.GetUser = async (req, res) => {
    var user = await AuthService.GetUser(req.user.id); 
    if(!user.error){
        return res.json(user.response);
    }else{
        return res.status(user.code).json({errors: [{msg: user.message }]})
    }
}

//@route    POST api/auth
//@desc     Authenticate User & Get Token
//@access   Public
exports.Authenticate = async (req, res) => {

    const {email, password} = req.body; 

    var user = await AuthService.Authenticate(email, password); 

    if(!user.error){
        jwt.sign(
            user.payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if(err) throw err; 
                res.json({ token });
            });
    }else{
        return res.status(user.code).json({errors: [{msg: user.message }]}); 
    }
}

//@route    POST api/auth/ChangePassword
//@desc     Update User Password
//@access   Private
exports.ChangePassword = async (req, res) => {

    const {oldPassword, newPassword} = req.body; 
    const UserID = req.user.id;

    var user = await AuthService.ChangePassword(UserID, oldPassword, newPassword); 

    if(!user.error){
       return res.json(user.response); 
    }else{
        return res.status(user.code).json({errors: [{msg: user.message }]}); 
    }
}

