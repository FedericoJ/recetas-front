const {check, validationResult} = require('express-validator');

exports.ChangePasswordValidator = [
    check('oldPassword','La Contraseña Anterior No puede Estar Vacia').notEmpty(),
    check('newPassword','La Contraseña Nueva No puede Estar Vacia').exists(),
    check('newPassword', 'La Contraseña debe ser mayor a 8 Caracteres').isLength({min:8}),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })   
    }
    next();
}];

exports.AuthValidator = [
    check('email','Por Favor Introduzca un Email Valido').isEmail(),
    check('password','La Contraseña no puede estar vacia').exists(),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })   
    }
    next();
}];
