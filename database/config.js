const mongoose = require('mongoose')

const dbconnection = async()=>{

    try {
        await mongoose.connect( process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        console.log('db online')
    } catch (error) {
        console.log(error)
        throw new Error('Error en la db')
    }
}

module.exports = {
    dbconnection
}