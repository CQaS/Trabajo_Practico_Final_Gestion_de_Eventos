import {
    Sequelize,
    DataTypes,
    Model
} from 'sequelize'

import {
    DATABASE,
    HOST,
    PASSWORD,
    USER,

} from '../config.js'

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'mysql'
})

async function testConnection() {
    try {
        await sequelize.authenticate()
        console.log(`Conectado con DB : ${DATABASE}`)
    } catch (error) {
        console.error(`No se puede conectar a la DB: ${DATABASE}`, error)
        process.exit(1) // Termina el proceso con un código de error
    }
}

testConnection()

const SDM = {
    sequelize,
    DataTypes,
    Model
}

export default SDM