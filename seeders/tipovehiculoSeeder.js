const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const TipoVehiculo = require('../models/tipovehiculo');

const tiposData = [
    {
        nombre: 'Carro',
        icono: 'fa-car',
        status: 'Activo',
    },
    {
        nombre: 'Moto',
        icono: 'fa-motorcycle',
        status: 'Activo',
    },
    {
        nombre: 'Camion',
        icono: 'fa-truck',
        status: 'Activo',
    },
    {
        nombre: 'Camioneta',
        icono: 'fa-truck-pickup',
        status: 'Activo',
    },
    {
        nombre: 'Pickup',
        icono: 'fa-truck-pickup',
        status: 'Activo',
    },
    {
        nombre: 'Van',
        icono: 'fa-truck-loading',
        status: 'Activo',
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

