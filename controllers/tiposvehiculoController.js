const { response } = require('express');
const TipoVehiculo = require('../models/tipovehiculo');

const getTipos = async(req, res) => {

    const tipos = await TipoVehiculo.find()
    .sort({ createdAt: -1 })

    res.json({
        ok: true,
        tipos
    });
};

const getTipo = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    TipoVehiculo.findById(id)
        .exec((err, tipo) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar TipoVehiculo',
                    errors: err
                });
            }
            if (!tipo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El tipo con el id ' + id + 'no existe',
                    errors: { message: 'No existe un tipo con ese ID' }
                });

            }
            res.status(200).json({
                ok: true,
                tipo: tipo,
            });
        });


    // res.json({
    //     ok: true,
    //     categoria
    //     //uid: req.uid
    // });
};


const crearTipo = async(req, res) => {

    const uid = req.uid;
    const tipo = new TipoVehiculo({
        usuario: uid,
        ...req.body,
    });

    try {

        const tipoDB = await tipo.save();

        res.json({
            ok: true,
            tipo: tipoDB
        });

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarTipo = async(req, res) => {

    const id = req.params.id;
    const uid = req.uid;


    try {

        const tipo = await TipoVehiculo.findById(id);
        if (!tipo) {
            return res.status(500).json({
                ok: false,
                msg: 'Tipo no encontrado por el id'
            });
        }

        const cambiosTipo = {
            ...req.body,
            usuario: uid
        }


        const tipoActualizado = await TipoVehiculo.findByIdAndUpdate(id, cambiosTipo, { new: true });

        res.json({
            ok: true,
            tipoActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarCTipo = async(req, res) => {

    const id = req.params.id;

    try {

        const tipo = await TipoVehiculo.findById(id);
        if (!tipo) {
            return res.status(500).json({
                ok: false,
                msg: 'tipo no encontrado por el id'
            });
        }

        await TipoVehiculo.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'tipo eliminado'
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }
};


const getTiposActivos = async(req, res) => {

    TipoVehiculo.find({  status: ['Activo'] }).exec((err, tipo_data) => {
        if (err) {
            res.status(500).send({ message: 'Ocurrió un error en el servidor.' });
        } else {
            if (tipo_data) {
                res.status(200).send({ tipos: tipo_data });
            } else {
                res.status(500).send({ message: 'No se encontró ningun dato en esta sección.' });
            }
        }
    });

};


function desactivar(req, res) {
    var id = req.params['id'];

    TipoVehiculo.findByIdAndUpdate({ _id: id }, { status: 'DESACTIVED' }, (err, tipo_data) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (tipo_data) {
                res.status(200).send({ tipo: tipo_data });
            } else {
                res.status(403).send({ message: 'No se actualizó el tipo, vuelva a intentar nuevamente.' });
            }
        }
    })
}

function activar(req, res) {
    var id = req.params['id'];
    // console.log(id);
    TipoVehiculo.findByIdAndUpdate({ _id: id }, { status: 'ACTIVED' }, (err, tipo_data) => {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (tipo_data) {
                res.status(200).send({ tipo: tipo_data });
            } else {
                res.status(403).send({ message: 'No se actualizó el tipo, vuelva a intentar nuevamente.' });
            }
        }
    })
}

module.exports = {
    getTipos,
    crearTipo,
    actualizarTipo,
    borrarCTipo,
    getTipo,
    getTiposActivos,
    desactivar,
    activar
};