const { response } = require('express');

const Destinatario = require('../models/destinatario');

const getDestinatarios = async(req, res = response) => {

    var id = req.params.id;
    try {
        if(id){
            var destinatarios = await Destinatario.find({'usuario': id})
        }        

        res.json({
            ok: true,
            destinatarios
        })
    } catch (error) {
        console.log('error: ',error);
        res.json({
            ok: false,
            message: 'No se encontró ningun destinatario'
        })
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}
  
    

const crearDestinatario = async (req, res = response) => {

    const { usuario,bank,type_account,number_account } = req.body;
       
    try {

        const existeDestinatario = await Destinatario.findOne({ usuario,bank,type_account,number_account });

        if ( existeDestinatario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El destinatario ya esta registrado'
            });
        }

        const destinatario = new Destinatario(req.body);
        const DestinatarioDB = await destinatario.save();

        
        res.json({
            ok: true,
            Destinatario: DestinatarioDB
        })

    } catch (error) {
        console.log('error:' ,error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema al intentar crear destinatario'
        })
    }


}



module.exports = {
    getDestinatarios,
    crearDestinatario
}