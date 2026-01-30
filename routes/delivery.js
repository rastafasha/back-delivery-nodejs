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
    listarPorUsuario,
    getDeliveryStatusUser,
    getDeliveryStatus,
    getDeliveryStatusTipoVh,
    activar,
entregado,
recibido,
actualizarCoord,
} = require('../controllers/deliveryController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


router.get('/', getDeliverys);
router.get('/user/:id', listarPorUsuario);
router.get('/show/:id', getDelivery);

router.get('/status/:status/:id', getDeliveryStatusUser);
router.get('/status/:status/', getDeliveryStatus);
router.get('/status/:status/:tipovehiculo', getDeliveryStatusTipoVh);


 router.get('/activar/:id/:driver',  activar);
 router.get('/entregado/:id/:driver',  entregado);
 router.get('/recibido/:id',  recibido);

  router.put('/update/coord/:id', [
     validarCampos
 ], actualizarCoord);


router.post('/registro', [
    validarJWT,
    validarCampos
], crearDelivery);

router.put('/update/:id', [
    // validarJWT,
    validarCampos
], actualizarDelivery);

router.delete('/remove/:id', validarJWT, borrarDelivery);





module.exports = router;