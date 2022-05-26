const Condition = require('../models/Condition'); 

exports.GetConditionList = async () => {
    try{
        let conditionList = await Condition.find().select('desc');
        return {response : conditionList, error: false};
    }catch(err){
        return {error: true, message : "Ha Ocurrido un Error", code:500}
    }
}