const { response } = require('express');
const Direccion = require('../models/direccion');
const Usuario = require('../models/usuario');

const getDireccions = async(req, res) => {

    const direccions = await Direccion.find().sort({ createdAt: -1 });

    res.json({
        ok: true,
        direccions
    });
};

const getDireccion = (req, res) => {

    var id = req.params['id'];
    Direccion.findById({ _id: id }, (err, data_direccion) => {
        if (!err) {
            if (data_direccion) {
                res.status(200).send({ direccion: data_direccion });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });


};

const crearDireccion = async(req, res) => {

    const uid = req.uid;
    const direccion = new Direccion({
        usuario: uid,
        ...req.body
    });

    try {

        const direccionDB = await direccion.save();

        res.json({
            ok: true,
            direccion: direccionDB
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarDireccion = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const direccion = await Direccion.findById(id);
        if (!direccion) {
            return res.status(500).json({
                ok: false,
                msg: 'direccion no encontrado por el id'
            });
        }

        const cambiosDireccion = {
            ...req.body,
            usuario: uid
        }

        const direccionActualizado = await Direccion.findByIdAndUpdate(id, cambiosDireccion, { new: true });

        res.json({
            ok: true,
            direccionActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarDireccion = async(req, res) => {

    const id = req.params.id;

    try {

        const direccion = await Direccion.findById(id);
        if (!direccion) {
            return res.status(500).json({
                ok: false,
                msg: 'direccion no encontrado por el id'
            });
        }

        await Direccion.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Direccion eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};

const listarPorUsuario = (req, res) => {
    var id = req.params['id'];
    Direccion.find({ user: id }, (err, data_direccion) => {
        if (!err) {
            if (data_direccion) {
                res.status(200).send({ direcciones: data_direccion });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    }).sort({ createdAt: -1 });
}
const getDireccionNombre = async(req, res) => {
    const userId = req.params.id;
    const nombres_completos = req.params.nombres_completos;

    try {
        // Verify user exists
        const usuario = await Usuario.findById(userId);
        
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            });
        }

        // Find address matching both user ID AND nombres_completos
        const data_direccion = await Direccion.find({ 
            user: userId,
            nombres_completos: nombres_completos
        }).sort({ createdAt: -1 });

        res.status(200).json({
            ok: true,
            direccion: data_direccion
        });

    } catch (err) {
        res.status(500).json({
            ok: false,
            error: err
        });
    }
}



module.exports = {
    getDireccions,
    crearDireccion,
    actualizarDireccion,
    borrarDireccion,
    getDireccion,
    listarPorUsuario,
    getDireccionNombre
};