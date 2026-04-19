const { response } = require('express');
const Usuario = require('../models/usuario');
const Transferencia = require('../models/transferencia');
const PagoEfectivo = require('../models/pago.efectivo');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');


    const [usuarios, 
        transferencias, pagoefectivos, categorias,
        promocions,
        ] = await Promise.all([
        Usuario.find({ first_name: regex }),
        Transferencia.find({ $or: [{referencia: regex}, {fecha: regex}, {amount: regex}, {bankName: regex}]}),
        PagoEfectivo.find({ $or: [{name_person: regex}, {amount: regex}] }),
    ]);

    res.json({
        ok: true,
        usuarios,
        transferencias,
        pagoefectivos,

    });
}

const getDocumentosColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {


        case 'usuarios':
            data = await Usuario.find({ first_name: regex, email: regex });
            break;


        case 'trasnferencias':
            data = await Transferencia.find({ $or: [{referencia: regex}, {fecha: regex}, {amount: regex}, {bankName: regex}]});
            break;


        case 'pagoefectivos':
            data = await PagoEfectivo.find({ $or: [{name_person: regex}, {amount: regex}] });
            break;




        default:
            return res.status(400).json({
                ok: false,
                msg: 'la tabla debe ser usuarios'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentosColeccion
}