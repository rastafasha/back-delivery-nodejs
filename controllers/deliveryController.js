const { response } = require('express');
const Delivery = require('../models/delivery');

const getDeliverys = async (req, res) => {

    const deliveries = await Delivery.find().sort({ createdAt: -1 });

    res.json({
        ok: true,
        deliveries
    });
};

const getDelivery = (req, res) => {

    var id = req.params['id'];
    Delivery.findById({ _id: id }, (err, data_delivery) => {
        if (!err) {
            if (data_delivery) {
                res.status(200).send({ delivery: data_delivery });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });


};

const crearDelivery = async (req, res) => {

    const uid = req.uid;
    const delivery = new Delivery({
        usuario: uid,
        ...req.body
    });

    try {

        const deliveryDB = await delivery.save();

        res.json({
            ok: true,
            delivery: deliveryDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin'
        });
    }


};

const actualizarDelivery = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const delivery = await Delivery.findById(id);
        if (!delivery) {
            return res.status(500).json({
                ok: false,
                msg: 'delivery no encontrado por el id'
            });
        }

        const cambiosDelivery = {
            ...req.body,
            usuario: uid
        }

        const deliveryActualizado = await Delivery.findByIdAndUpdate(id, cambiosDelivery, { new: true });
        res.json({
            ok: true,
            deliveryActualizado
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

const borrarDelivery = async (req, res) => {

    const id = req.params.id;

    try {

        const delivery = await Delivery.findById(id);
        if (!delivery) {
            return res.status(500).json({
                ok: false,
                msg: 'delivery no encontrado por el id'
            });
        }

        await Delivery.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Delivery eliminado'
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
    Delivery.find({ user: id }, (err, data_delivery) => {
        if (!err) {
            if (data_delivery) {
                res.status(200).send({ deliveries: data_delivery });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    }).sort({ createdAt: -1 });
}

const getDeliveryStatusUser = (req, res) => {
    var status = req.params['status'];
    var id = req.params['id'];
    Delivery.find({ status: status, $or: [{ user: id }, { driver: id }] }, (err, data_delivery) => {
        if (!err) {
            if (data_delivery) {
                res.status(200).send({ deliveries: data_delivery });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    }).sort({ createdAt: -1 });
}

const getDeliveryStatus = (req, res) => {
    var status = req.params['status'];
    Delivery.find({ status: status }, (err, data_delivery) => {
        if (!err) {
            if (data_delivery) {
                res.status(200).send({ deliveries: data_delivery });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            res.status(500).send({ error: err });
        }
    }).sort({ createdAt: -1 });
}

function activar(req, res) {
    var id = req.params['id'];
    var driver = req.params['driver'];
    // console.log(id);
    Delivery.findByIdAndUpdate({ _id: id },
        { status: 'En Camino', driver: driver },
        (err, delivery_data) => {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                if (delivery_data) {
                    res.status(200).send({ delivery: delivery_data });
                } else {
                    res.status(403).send({ message: 'No se actualizó el delivery, vuelva a intentar nuevamente.' });
                }
            }
        })
}

function entregado(req, res) {
    var id = req.params['id'];
    var driver = req.params['driver'];
    // console.log(id);
    Delivery.findByIdAndUpdate({ _id: id },
        { status: 'Entregado', driver: driver },
        (err, delivery_data) => {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                if (delivery_data) {
                    res.status(200).send({ delivery: delivery_data });
                } else {
                    res.status(403).send({ message: 'No se actualizó el delivery, vuelva a intentar nuevamente.' });
                }
            }
        })
}

function recibido(req, res) {
    var id = req.params['id'];
    // console.log(id);
    Delivery.findByIdAndUpdate({ _id: id },
        { status: 'Confirmado' },
        (err, delivery_data) => {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                if (delivery_data) {
                    res.status(200).send({ delivery: delivery_data });
                } else {
                    res.status(403).send({ message: 'No se actualizó el delivery, vuelva a intentar nuevamente.' });
                }
            }
        })
}


const actualizarCoord = async (req, res) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const delivery = await Delivery.findById(id);
        if (!delivery) {
            return res.status(500).json({
                ok: false,
                msg: 'delivery no encontrado por el id'
            });
        }

        const cambiosDelivery = {
            ...req.body,
            usuario: uid
        }

        const deliveryActualizado = await Delivery.findByIdAndUpdate(id, cambiosDelivery, { new: true });

        res.json({
            ok: true,
            deliveryActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error hable con el admin'
        });
    }


};

module.exports = {
    crearDelivery,
    actualizarDelivery,
    borrarDelivery,
    getDelivery,
    getDeliverys,
    listarPorUsuario,
    getDeliveryStatus,
    activar,
    entregado,
    recibido,
    actualizarCoord,
    getDeliveryStatusUser,

};