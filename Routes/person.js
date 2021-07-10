const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarJWT } = require('../middlewares/validadJWT');
const { validarResultados } = require('../middlewares/validar-campos');
const { getPeople, getPerson, addPerson, deletePerson, editPerson, prueba } = require('../controllers/person');

router.get('/', [], getPeople);

router.get('/:id', [], getPerson);

router.post('/', [
    check('Nombres','El nombre es obligatorio').not().isEmpty(),
    check('Correoelectronico','El correo electrónico es obligatorio').not().isEmpty(),
    check('Curp','La Curp electrónico es obligatorio').not().isEmpty().isLength({ min : 10 , max : 10 }),
    check('Apellido_paterno','El apellido paterno es obligatorio').not().isEmpty(),
    //check('Apellido_materno','El apellido materno es obligatorio').not().isEmpty(),
    check('Fecha_nac','El formato de la fecha de nacimiento es el siguiente: AAAA-MM-DD').isDate().not().isEmpty(),
    check('Direccion','La direccion es obligatoria').not().isEmpty(),
    check('Colonia','La colonia es obligatorio').not().isEmpty(),
    check('Cp','El código postal es obligatorio').not().isEmpty(),
    check('Telefono','El teléfono es un minimo y máximo de 10 dígitos').isLength({ min : 10 , max : 10 }).isNumeric().not().isEmpty(),
    
    validarResultados,
], addPerson);

router.delete('/:id', [], deletePerson);

router.put('/:id',[
    check('Nombres','El nombre es obligatorio').not().isEmpty(),
    check('Correoelectronico','El correo electrónico es obligatorio').not().isEmpty(),
    check('Curp','La Curp electrónico es obligatorio').not().isEmpty(),
    check('Apellido_paterno','El apellido paterno es obligatorio').not().isEmpty(),
    //check('Apellido_materno','El apellido materno es obligatorio').not().isEmpty(),
    check('Fecha_nac','El formato de la fecha de nacimiento es el siguiente: AAAA-MM-DD').isDate().not().isEmpty(),
    check('Direccion','La direccion es obligatoria').not().isEmpty(),
    check('Colonia','La colonia es obligatorio').not().isEmpty(),
    check('Cp','El código postal es obligatorio').not().isEmpty(),
    check('Telefono','El teléfono es un minimo y máximo de 10 dígitos').isLength({ min : 10 , max : 10 }).isNumeric().not().isEmpty(),
    validarResultados,
    []
], editPerson);


router.get('/eje/eje', [], prueba)
module.exports = router;