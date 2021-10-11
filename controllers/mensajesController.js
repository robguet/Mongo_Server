const Mensaje = require('../models/Mensaje');

const obtenerChat = async (req, res) => {
	try {
		const miUID = req.uid;
		const mensajeDe = req.params.de;

		const ultimos30 = await Mensaje.find({
			$or: [{ de: miUID }, { para: mensajeDe }],
		})
			.sort({ createdAt: 'desc' })
			.limit(30);

		res.json({
			ok: true,
			miUID,
			mensajeDe,
			ultimos30
		});
	} catch (error) {
		res.status(500).json({
			mensaje: 'Hable con el administrador',
		});
	}
};

module.exports = {
	obtenerChat,
};
