var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DireccionSchema = Schema({
    nombre_ubicacion: { type: String, required: true },
    direccion: { type: String, required: true },
    referencia: { type: String, required: false },
    latitud: { type: String, required: false },
    longitud: { type: String, required: false },
    user: { type: Schema.ObjectId, ref: 'user' },
    createdAt: { type: Date, default: Date.now, required: true },
    updatedAt: { type: Date }
});

module.exports = mongoose.model('direccion', DireccionSchema);