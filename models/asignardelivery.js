const { Schema, model } = require('mongoose');

const AsignarDeliverySchema = Schema({
   
    driver: {
        type: Schema.Types.ObjectId,
        ref: 'driver',
        require: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        require: true
    },
    delivery: {
        type: Schema.Types.ObjectId,
        ref: 'delivery',
        require: true
    },
    driverPosition: { type: String, required: false, default: '0' },
    deliveryPosition: { type: String, required: false, default: '0' },
    status: { type: String, required: false, default: 'POR-ASIGNAR' },
    statusD: { type: String, required: false, default: 'POR-ASIGNAR' },
    statusC: { type: String, required: false, default: 'POR-ASIGNAR' },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date }
});

AsignarDeliverySchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('asignardelivery', AsignarDeliverySchema);