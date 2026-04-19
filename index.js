// Load environment variables FIRST - before any other requires
require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
const path = require('path');
const socketIO = require('socket.io');

//notifications
const webpush = require('web-push');
const bodyParser = require('body-parser');

//crear server de express
const app = express();
const server = require('http').Server(app);



// Initialize socket.io with the server
const allowedOrigins = [
  "http://localhost:4207",
  "https://enviosapp-five.vercel.app",
];

// Configuración compartida
const corsOptions = {
  origin: (origin, callback) => {
    // Si el origen está en la lista o es una petición local (sin origen)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Origin no permitido por CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
};

// 1. Aplicar a las rutas normales de Express (REST API)

app.use(cors(corsOptions));

// 2. Aplicar a Socket.io
const io = socketIO(server, {
  cors: corsOptions
});

// Export io for use in other modules
module.exports.io = io;


//lectura y parseo del body
app.use(express.json());

//directiorio publico de pruebas de google
app.use(express.static('public'));

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

//tienda
app.use('/api/congenerals', require('./routes/congeneral'));
app.use('/api/direccions', require('./routes/direccion'));
app.use('/api/postals', require('./routes/postal'));
// app.use('/api/tickets', require('./routes/ticket'));
app.use('/api/tipopago', require('./routes/tipopago'));
app.use('/api/transferencias', require('./routes/transferencia'));
app.use('/api/pagoefectivo', require('./routes/pago.efectivo'));
app.use('/api/paises', require('./routes/pais'));
app.use('/api/driver', require('./routes/driver'));
app.use('/api/delivery', require('./routes/delivery'));
app.use('/api/tipovehiculo', require('./routes/tipovehiculo'));

//notification
const vapidKeys = {
    "publicKey": "BOD_CraUESbh9BhUEccgqin8vbZSKHAziTtpqvUFl8B8LO9zrMnfbectiViqWIsTLglTqEx3c0XsmqQQ5A-KALg",
    "privateKey": "34CA-EpxLdIf8fmJBj2zoDg5OIQIvveBcu7zWkTkPnw"
};

webpush.setVapidDetails(
    'mailto:example@youremail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
);

app.use(bodyParser.json());

//test
app.get("/", (req, res) => {
  res.json({ message: "Welcome to nodejs." });
});

//lo ultimo
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public')); //ruta para produccion, evita perder la ruta
});

// Exportar app para Vercel (serverless)
module.exports = app;

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler caught an error:', err);
    res.status(500).json({
        ok: false,
        msg: 'Internal Server Error',
        error: err.message || err.toString()
    });
});

// Main async function to initialize server
async function main() {
    try {
        // Await database connection before starting the server
        // This fixes "Cannot call findOne() before initial connection is complete" error
        await dbConnection();
        
        console.log('Database connected successfully');
        
        // Solo iniciar servidor local si no estamos en Vercel
        if (process.env.VERCEL !== '1') {
            server.listen(process.env.PORT, () => {
                console.log('Servidor en puerto: ' + process.env.PORT);
            });
        }
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

// Start the server
main();

