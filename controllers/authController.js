const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const usuarioDB = await Usuario.findOne({ email });

		if (!usuarioDB) {
			return res.status(404).json({
				mensaje: 'Usuario no encontrado',
			});
		}

		//validar password
		const validPassword = bcrypt.compareSync(password, usuarioDB.password);

		if (!validPassword) {
			return res.status(404).json({
				ok: false,
				mensaje: 'Contraseña invalida',
			});
		}

		//generar jwt
		const token = await generarJWT(usuarioDB.id);

		res.json({
			token,
			usuarioDB,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({
			mensaje: 'Hable con el administrador',
		});
	}
};

const newUser = async (req, res) => {
	console.log('object');
	try {
		const { email, password } = req.body;
		const usuarioExiste = await Usuario.findOne({ email });
		console.log(usuarioExiste);
		if (usuarioExiste) {
			return res.status(400).json({ msg: 'El correo ya existe' });
		}

		const usuario = new Usuario(req.body);

		//encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		//guardar en la db
		await usuario.save();

		//generar el jwt
		const token = await generarJWT(usuario.id);

		res.status(200).json({
			usuario,
			token,
			ok: true,
		});
	} catch (error) {
		res.status(500).json({
			mensaje: 'Hable con el administrador',
		});
	}
};

const resendToken = async (req, res) => {
	const uid = req.uid;

	try {
		//generar un nuevo token
		const token = await generarJWT(uid);

		const usuario = await Usuario.findById(uid)

		res.json({ ok: true,token, usuario });
	} catch (error) {}
};

module.exports = {
	login,
	newUser,
	resendToken,
};
