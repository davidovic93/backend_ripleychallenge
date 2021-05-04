/*
    Transferencias
    ruta: '/api/transferencia'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getTransferencias,
    crearTransferencia,
} = require('../controllers/transferencia')


const router = Router();

router.get( '/:id', 
[
    validarJWT
],
getTransferencias );

router.post( '/',
    [
        validarJWT,
        check('destinatario','El destinatario es necesario').not().isEmpty(),
        check('amount','El monto de transferencia es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearTransferencia 
);



module.exports = router;
