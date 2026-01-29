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
router.get('/deliveryusuario/:id', listarPorUsuario);
router.get('/show/:id', getDelivery);

router.post('/registro', [
    validarJWT,
    // check('direccion', 'El direccion es necesario').not().isEmpty(),
    validarCampos
], crearDelivery);

router.put('/delivery/update/:id', [
    validarJWT,
    check('direccion', 'El direccion es necesario').not().isEmpty(),
    validarCampos
], actualizarDelivery);

router.delete('/delivery/remove/:id', validarJWT, borrarDelivery);





module.exports = router;