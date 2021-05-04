const { Schema, model } = require('mongoose');

const TransferenciaSchema = Schema({

    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    destinatario: {
        type: Schema.Types.ObjectId,
        ref: 'Destinatario',
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
    amount: {
        type: Number,
        required: true
    },    
    fecha: {
        type: Date, 
        required: false
    }
    
});

TransferenciaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})



module.exports = model( 'Transferencia', TransferenciaSchema );