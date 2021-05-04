const { Schema, model } = require('mongoose');

const DestinatarioSchema = Schema({

    usuario: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Usuario'
    },
    destinatario_name: {
        type: String,
        required: true
    },
    rut: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    bank: {
        type: String,
        required: true
    },
    type_account: {
        type: String,
        required: true
    },
    number_account: {
        type: String,
        required: true
    },    
    phone: {
        type: String,
        required: true
    },    
    fecha: {
        type: Date, 
        required: false
    }
    
});

DestinatarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Destinatario', DestinatarioSchema );
