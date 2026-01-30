var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoVehiculoSchema = Schema({
    nombre: { type: String, required: true },
    icono: { type: String, required: true },
    precio: { type: String, required: false },
    img: { type: String,  require: false},
    status: { type: String, required: false, default: 'Desactivado' },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('tipovehiculo', TipoVehiculoSchema);