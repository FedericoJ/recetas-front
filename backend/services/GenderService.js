const Gender = require('../models/Gender')


exports.GetGenderList = async () => {
    try{
        let GenderList = await Gender.find().select('desc');
        return {response : GenderList, error: false};
    }catch(err){
        return {error : true, message : "Ha Ocurrido un error", code:500}
    }
}