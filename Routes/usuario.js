const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

const { validarResultados } = require('../middlewares/validar-campos');
const { getUsuarios, getUsuario, addUsuario, deleteUsuario, updateUsuario, loginUsuario, renewToken} = require('../controllers/usuario')
const { validarJWT } = require('../middlewares/validadJWT');

const validaciones = [
    check('email', 'El email debe ser un correo valido').isEmail().not().isEmpty(),
    check('password', 'La contraseña es obligatoría. Debe ser minimo de 8 caracteres. Tiene que tener un caracter especial. Tiene que tener un número').exists().isStrongPassword({minUppercase : 1, minSymbols : 1, minNumbers : 1}).isLength({ min : 8}).not().isEmpty(),
    check('tipoId', 'El TipoId es obligatorío').isNumeric().not().isEmpty(),
    check('confirmPassword', 'Confirmar contraseña es obligatorío').not().isEmpty(),
    validarResultados,
]


router.get('/', validarJWT, getUsuarios);

router.get('/newLogin', validarJWT, renewToken);

router.get('/:id', validarJWT, getUsuario);

router.post('/login/jwt', loginUsuario);

router.post('/',validaciones, addUsuario);

router.delete('/:id', validarJWT, deleteUsuario);

router.put('/:id', [validaciones, validarJWT ], updateUsuario);

module.exports = router;