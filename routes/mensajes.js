const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { obtenerChat } = require('../controllers/mensajesController');



router.get('/:de', validarJWT, obtenerChat )

module.exports = router;
