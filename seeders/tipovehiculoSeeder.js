const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const TipoVehiculo = require('../models/tipovehiculo');

const tiposData = [
    {
        nombre: 'Carro',
        icono: 'fa-car',
        status: 'ACTIVED',
    },
    {
        nombre: 'Moto',
        icono: 'fa-motorcycle',
        status: 'ACTIVED',
    },
    {
        nombre: 'Camion',
        icono: 'fa-truck',
        status: 'ACTIVED',
    },
    {
        nombre: 'Camioneta',
        icono: 'fa-truck-pickup',
        status: 'ACTIVED',
    },
    {
        nombre: 'Pickup',
        icono: 'fa-truck-pickup',
        status: 'ACTIVED',
    },
    {
        nombre: 'Van',
        icono: 'fa-truck-loading',
        status: 'ACTIVED',
    },
];

const seedTipos = async () => {
    try {
        // Conectar a la base de datos
        await mongoose.connect(process.env.DB_MONGO);
        console.log('✅ Conectado a la base de datos');

        // Eliminar  existentes
        await TipoVehiculo.deleteMany({});
        console.log('✅  existentes eliminados');

        await TipoVehiculo.insertMany(tiposData);

        mongoose.connection.close();
        console.log('✅ Conexión cerrada');
    } catch (error) {
        console.error('❌ Error al ejecutar el seeder:', error);
        process.exit(1);
    }
};

seedTipos();

