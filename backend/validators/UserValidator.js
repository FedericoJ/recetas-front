const {check, validationResult} = require('express-validator');

exports.ValidateRegister = [
    check('firstName', 'Ingrese un Nombre').not().isEmpty(),
    check('lastName', 'Ingrese un Apellido').not().isEmpty(),
    check('email', 'Ingrese un Correo Electronico Valido').not().isEmpty().isEmail(),
    check('password', 'Ingrese una Contraseña').not().isEmpty(),
    check('password', 'La Contraseña debe ser mayor a 6 Caracteres').isLength({min:6}),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })   
    }
    next();
}];