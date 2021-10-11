const express = require('express');
const http = require('http');
const path = require('path');
const cors = require('cors');
const { dbconnection } = require('../database/config');


class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		//conectar db
		dbconnection()

		//http server
		this.server = http.createServer(this.app);
	}

	execute() {
		// init middlewares
		this.middlewares();

		//init server
		this.server.listen(this.port, () => {
			console.log('corriendo ');
		});
	}

	middlewares() {
		this.app.use(express.static(path.resolve(__dirname, '../public')));

		this.app.use(cors());

		this.app.use(express.json())

		this.app.use('/api/login', require('../routes/auth'))
		this.app.use('/api/chat', require('../routes/mensajes'))

	}
}

module.exports = Server;
