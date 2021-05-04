/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const {  crearUsuario } = require('../controllers/usuario');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post( '/',
    [
        check('firstname', 'El nombre es obligatorio').not().isEmpty(),
        check('lastname', 'El apellido es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        check('rut', 'El rut es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUsuario 
);

module.exports = router;