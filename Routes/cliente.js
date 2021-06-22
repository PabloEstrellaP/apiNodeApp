const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarJWT } = require('../middlewares/validadJWT');
const { validarResultados } = require('../middlewares/validar-campos');
const { getClientes, getCliente, addCliente, deleteCliente, updateCliente } = require('../controllers/cliente');

router.get('/', validarJWT, getClientes);

router.get('/:id', validarJWT, getCliente);

router.post('/', [
    check('nombrecl','El nombre es obligatorio').not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('apellidocl','El apellido es obligatorio').not().isEmpty(),
    check('telefono','El teléfono es un minimo y máximo de 10 dígitos').isLength({ min : 10 , max : 10 }).isNumeric().not().isEmpty(),
    check('nacimiento','El formato de la fecha de nacimiento es el siguiente: AAAA-MM-DD').isDate().not().isEmpty(),
    check('usuarioId', 'El usuarioID es obligatorio').isNumeric().not().isEmpty(),
    validarResultados,
], addCliente);

router.delete('/:id', validarJWT, deleteCliente);

router.put('/:id',[
    check('nombrecl','El nombre es obligatorio').not().isEmpty(),
    check('apellidocl','El apellido es obligatorio').not().isEmpty(),
    check('nacimiento','El formato de la fecha de nacimiento es el siguiente: AAAA-MM-DD').isDate().not().isEmpty(),
    check('direccion','La direccion es obligatoria').not().isEmpty(),
    check('telefono','El teléfono es un minimo y máximo de 10 dígitos').isLength({ min : 10 , max : 10 }).isNumeric().not().isEmpty(),
    validarResultados,
    validarJWT
], updateCliente);

module.exports = router;