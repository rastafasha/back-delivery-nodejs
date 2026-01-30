const { Schema, model } = require('mongoose');

const DeliverySchema = Schema({
   
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    driver: {
        type: String,
        ref: 'driver',
        require: true
    },
    direccionRecogida: { type: String, required: true, ref: 'direccion' },
    direccionEntrega: { type: String, required: true, ref: 'direccion' },
    tipovehiculo: { type: String, required: false, ref: 'tipovehiculo' },
    precio: { type: String, required: false },
    title: { type: String, required: false },
    img: { type: String },
    largo: { type: String, required: false },
    ancho: { type: String, required: false },
    alto: { type: String, required: false },
    peso: { type: String, required: false },
    fechaEnvio: { type: String,  required: false },
    horaEnvio: { type: String,  required: false },
    descripcion: { type: String,  required: false },
    status: { type: String, required: false, default: 'PENDIENTE' },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date }
});

DeliverySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('delivery', DeliverySchema);