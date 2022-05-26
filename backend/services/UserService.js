const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.GetMyProfile = async (userID) => {
    try {
        const profile = await User.findOne({ _id : userID}).select('-password')
        if (!profile){
            return { error: true , message : 'No se Encontro el Perfil', code:400}
        }
       return {response : profile, error : false};
    }catch(err){
        return { error : true, message : "Ha Ocurrido un Error", code:500}
    }
}

exports.Register = async ( firstName, lastName,password, email,gender,condition ) => {

    try{
        let user = await User.findOne({ email }).lean();
        
        if(user){
            return { error : true, code: 400,  message : 'El Correo ya Existe'}
        }

        //User Creation with the fields that i extracted before...
        user = new User({
            firstName, 
            lastName,
            password, 
            email, 
            gender,
            condition
        });

        //Password Encryption
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password,salt);
        
        //Saving the User to the database.
        await user.save();
        //Returning a JSON WebToken.
        const payload = {
            user : {
                id: user.id
            }
        }
        return {payload : payload , error : false}
    }catch (err){
        console.log(err)
        return { error : true, code: 500,  message : "Ha Ocurrido un Error"}
    }
}

exports.UpdateUser = async (_id, firstName, lastName, gender, condition) => {
    console.log(_id)

    try{
        const user = await User.findOneAndUpdate(
            { _id : _id },
            {
                firstName : firstName,
                lastName :  lastName, 
                gender : gender,
                condition : condition
            },
            {new: true}).select('-password')
        console.log(user)
        return {response : user, error : false};
        }catch(err){
            return { error : true, message : "Ha Ocurrido un Error"};
        }
}