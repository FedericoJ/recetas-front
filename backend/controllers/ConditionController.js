const ConditionService = require('../services/ConditionService');


// @route   GET /api/gender/GetGenders
// @desc    get all bloodtypes
// @access  Public

exports.GetConditions = async (req,res) => {
    var conditionList = await ConditionService.GetConditionList();
    if(!conditionList.error){
        return res.json(conditionList.response);
    }else{
        return res.status(conditionList.code).json({errors: [{msg: conditionList.message}]});
    }
}
