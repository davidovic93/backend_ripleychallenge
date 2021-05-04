const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async(req, res = response) => {

    const { rut, password } = req.body;

    try {

        const existeRut = await Usuario.findOne({ rut });

        if ( existeRut ) {
            return res.status(400).json({
                ok: false,
                msg: 'El rut ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );
    
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
    
        // Guardar usuario
        await usuario.save();

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );


        res.json({
            ok: true,
            usuario,
            token
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }


}



module.exports = {
    crearUsuario
}