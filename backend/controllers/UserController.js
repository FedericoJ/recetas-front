const UserService = require('../services/UserService')
const config = require('config');
const jwt = require('jsonwebtoken'); 

// @route   GET api/users/me
// @desc    Get Current User Profile
// @access  Public
exports.GetMyProfile = async (req, res) => {

    var user = await UserService.GetMyProfile(req.user.id); 

    if(!user.error){
        return res.json(user.response);
    }else{
        return res.status(user.code).json({errors: [{msg: user.message }]})
    }
}

// @route   POST api/users
// @desc    Register User
// @access  Public

exports.Register = async (req, res ) => {
    
    const {firstName, lastName,password, email, gender,condition} = req.body;
    var user = await UserService.Register(firstName, lastName,password, email, gender,condition);
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
        console.log(user)
       return res.status(user.code).json({errors: [{msg: user.message }]}); 
    }
}

// @route   PUT api/users
// @desc    Update  User
// @access  Private
exports.UpdateUser = async (req, res) => {

    const {_id, firstName, lastName, gender, condition} = req.body

    var user = await UserService.UpdateUser(_id, firstName, lastName, gender, condition); 

    if(!user.error){
        res.json(user); 
    }else{
        return res.status(500).json( {errors: [{msg: user.message}]});
    }
}