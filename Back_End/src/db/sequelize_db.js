import {
    Sequelize,
    DataTypes,
    Model
} from 'sequelize'

/* 
Configuración de conexión a la base de datos utilizando Sequelize:

1. Importación de variables de configuración:
   - Se importan las constantes DATABASE, HOST, PASSWORD y USER desde el archivo de configuración '../config.js'.

2. Creación de una instancia de Sequelize:
   - Se crea una nueva instancia de Sequelize, pasando los parámetros necesarios para la conexión a la base de datos:
     - DATABASE: nombre de la base de datos.
     - USER: nombre de usuario para la conexión.
     - PASSWORD: contraseña del usuario.
     - Un objeto de configuración que especifica:
       - host: dirección del servidor donde está alojada la base de datos.
       - dialect: tipo de base de datos (en este caso, 'mysql').

3. Función para probar la conexión a la base de datos:
   - Se define una función asíncrona testConnection que intenta autenticar la conexión utilizando sequelize.authenticate().
   - Si la conexión es exitosa, imprime un mensaje en la consola indicando que se ha conectado a la base de datos especificada.
   - Si ocurre un error durante el proceso de autenticación, captura el error y lo imprime en la consola junto con un mensaje indicando que no se puede conectar a la base de datos.

4. Llamada a la función testConnection:
   - Se llama a testConnection para ejecutar la prueba de conexión al iniciar el script.

Este código está diseñado para establecer y verificar una conexión a una base de datos MySQL utilizando Sequelize, proporcionando mensajes claros sobre el estado de la conexión.
*/

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