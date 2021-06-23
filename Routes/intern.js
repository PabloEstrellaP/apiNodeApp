const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { validarJWT } = require('../middlewares/validadJWT');
const { validarResultados } = require('../middlewares/validar-campos');
const { getInterns, getIntern, addIntern, deleteIntern, editIntern } = require('../controllers/intern');

router.get('/', [], getInterns);

router.get('/:id', [], getIntern);

router.post('/', [
    check('Promedio','El Promedio es obligatorio').not().isEmpty(),
    check('Escuela','La Escuela es obligatorio').not().isEmpty(),
    check('Licenciatura','La Licenciatura es obligatorio').not().isEmpty(),
    check('Idpersona','El Idpersona es obligatorio').not().isEmpty(),
    validarResultados,
], addIntern);

router.delete('/:id', [], deleteIntern);

router.put('/:id',[
    check('Promedio','El Promedio es obligatorio').not().isEmpty(),
    check('Escuela','La Escuela es obligatorio').not().isEmpty(),
    check('Licenciatura','La Licenciatura es obligatorio').not().isEmpty(),
    check('Idpersona','El Idpersona es obligatorio').not().isEmpty(),
    validarResultados,
], editIntern);

module.exports = router;