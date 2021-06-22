const {Router} = require('express')
const { check } = require('express-validator');
const router = Router();

const { getEmpleados, getEmpleado, addEmpleado, deleteEmpleado, updateEmpleado } = require('../controllers/empleado');
const { validarResultados } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validadJWT');

router.get('/', validarJWT, getEmpleados);

router.get('/:id', validarJWT, getEmpleado);

router.post('/',[

    check('nombreemp','El nombre es obligatorio').not().isEmpty(),
    check('apellidoem','El apellido es obligatorio').not().isEmpty(),
    check('telefono','El teléfono es un máximo de 10 dígitos').isLength({ min : 10 , max : 10 }).isNumeric().not().isEmpty(),
    check('fechanacimiento','El formato de la fecha de nacimiento es el siguiente: AAAA-MM-DD').isDate().not().isEmpty(),
    check('usuarioId', 'El usuarioID es obligatorio').isNumeric().not().isEmpty(),
    validarResultados,

], addEmpleado);

router.delete('/:id', validarJWT, deleteEmpleado);

router.put('/:id', [
    
    check('nombreemp','El nombre es obligatorio').not().isEmpty(),
    check('apellidoem','El apellido es obligatorio').not().isEmpty(),
    check('telefono','El teléfono es un máximo de 10 dígitos').isLength({ min : 10, max : 10 }).isNumeric(),
    check('fechanacimiento','El formato de la fecha de nacimiento es el siguiente: AAAA-MM-DD').isDate().not().isEmpty(),
    validarResultados,
    validarJWT
], updateEmpleado);

module.exports = router;