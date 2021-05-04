const { response } = require('express');

const Transferencia = require('../models/transferencia');

const getTransferencias = async(req, res = response) => {

    var id = req.params.id;

    try {
        if(id){
            var transferencias = await Transferencia.find({'usuario': id}).populate('destinatario','destinatario_name rut')
        }

        res.json({
            ok: true,
            transferencias
        })
    } catch (error) {
        console.log('error: ',error);
        res.json({
            ok: false,
            message: 'No se encontró ninguna transferencia'
        })
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
    
}

const crearTransferencia = async (req, res = response) => {

    const uid = req.uid;
    const transferencia = new Transferencia({
        transferencia: uid,
        ...req.body
    });


    try {

        const transferenciaDB = await transferencia.save();

        
        res.json({
            ok: true,
            transferencia: transferenciaDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}



module.exports = {
    getTransferencias,
    crearTransferencia
}