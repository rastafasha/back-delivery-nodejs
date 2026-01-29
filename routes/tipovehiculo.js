/*
 Ruta: /api/tipovehiculo
 */

const { Router } = require('express');
const router = Router();
const {
    getTipos,
    crearTipo,
    actualizarTipo,
    borrarCTipo,
    getTipo,
    getTiposActivos,
    desactivar,
    activar
} = require('../controllers/tiposvehiculoController');

const { validarJWT } = require('../middlewares/validar-jwt');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

router.get('/', getTipos);
router.get('/:id', getTipo);
router.get('/activo', getTiposActivos);


router.get('/desactivar/:id', validarJWT, desactivar);
router.get('/activar/:id', validarJWT, activar);

router.post('/registro', [
    validarJWT,
    check('nombre', 'El nombre del categoria es necesario').not().isEmpty(),
    validarCampos
], crearTipo);

router.put('/update/:id', [
    validarJWT,
    check('nombre', 'El nombre del categoria es necesario').not().isEmpty(),
    validarCampos
], actualizarTipo);



router.delete('/:id', validarJWT, borrarCTipo);




module.exports = router;