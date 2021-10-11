const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const authController = require('../controllers/authController');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validarCampos');

//crear nuevos usuario
router.post(
	'/new',
	[
		check('email', 'El nombre es obligatorio').isEmail(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		check('name', 'El nombre es obligatorio').isString(),
		validarCampos,
	],
	authController.newUser
);

//login
router.post(
	'/',
	[
		check('email', 'El nombre es obligatorio').isEmail(),
		check('password', 'La contraseña es obligatoria').not().isEmpty(),
		validarCampos,
	],
	authController.login
);

//revalidar token
router.get('/renew', validarJWT, authController.resendToken);

module.exports = router;
