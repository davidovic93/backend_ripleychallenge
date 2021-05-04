const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const login = async( req, res = response ) => {

    const { rut, password } = req.body;

    try {
        // Verificar rut
        const usuarioDB = await Usuario.findOne({ rut });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Rut no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );
        usuarioDB.password = '';

        res.json({
            ok: true,
            token,
            usuario: usuarioDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    console.log(uid);
    // Generar el TOKEN - JWT
    const token = await generarJWT( uid );

    // Obtener el usuario por UID
    var usuario = await Usuario.findById( uid);
    usuario.password = '';

    res.json({
        ok: true,
        token,
        usuario
    });

}



module.exports = {
    login,renewToken
}
