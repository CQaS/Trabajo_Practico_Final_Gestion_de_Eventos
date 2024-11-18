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

const testConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log(`Conectado con DB : ${DATABASE}`)
    } catch (error) {
        console.error(`No se puede conectar a la DB: ${DATABASE}`, error)
    }
}

testConnection()

const SDM = {
    sequelize,
    DataTypes,
    Model
}

export default SDM