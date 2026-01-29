/*
 Ruta: /api/delivery
 */

const { Router } = require('express');
const router = Router();
const {

    crearDelivery,
    actualizarDelivery,
    borrarDelivery,
    getDelivery,
    getDeliverys,
    listarPorUsuario
} = require('../controllers/deliveryController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/', getDeliverys);
router.get('/user/:id', listarPorUsuario);
router.get('/show/:id', getDelivery);

router.post('/registro', [
    validarJWT,
    validarCampos
], crearDelivery);

router.put('/update/:id', [
    validarJWT,
    validarCampos
], actualizarDelivery);

router.delete('/remove/:id', validarJWT, borrarDelivery);





module.exports = router;