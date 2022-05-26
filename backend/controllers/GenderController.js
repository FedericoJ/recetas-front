const GenderService = require('../services/GenderService');


// @route   GET /api/gender/GetGenders
// @desc    get all bloodtypes
// @access  Public

exports.GetGenders = async (req,res) => {
    var genderList = await GenderService.GetGenderList();
    if(!genderList.error){
        return res.json(genderList.response);
    }else{
        return res.status(genderList.code).json({errors: [{msg: genderList.message}]});
    }
}
