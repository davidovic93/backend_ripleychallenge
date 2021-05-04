/*
    Destinatarios
    ruta: '/api/destinatario'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getDestinatarios,
    crearDestinatario,
} = require('../controllers/destinatario')


const router = Router();

router.get( '/:id', 
[
    validarJWT
],
getDestinatarios );

router.post( '/',
    [
        validarJWT,
        check('usuario','El usuario adjunto es necesario').not().isEmpty(),
        check('destinatario_name','El nombre del destinatario es necesario').not().isEmpty(),
        check('rut','El rut del destinatario es necesario').not().isEmpty(),
        check('email','El email del destinatario es necesario').not().isEmpty(),
        check('bank','El banco del destinatario es necesario').not().isEmpty(),
        check('type_account','El tipo de cuenta del destinatario es necesario').not().isEmpty(),
        check('number_account','El nro cuenta del destinatario es necesario').not().isEmpty(),
        check('phone','El teléfono del destinatario es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearDestinatario 
);



module.exports = router;
