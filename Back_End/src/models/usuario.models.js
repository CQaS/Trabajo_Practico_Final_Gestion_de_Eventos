import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {
    pattern_Nombre,
    pattern_Direccion
} from '../config.js'


class Usuarios extends Model {}

Usuarios.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre es obligatorio.'
            },
            len: {
                args: [3, 100],
                msg: 'El nombre debe tener entre 3 y 100 caracteres.',
            },
            is: {
                args: pattern_Nombre,
                msg: "Nombre de Usuario sólo puede contener letras y espacios"
            }
        },
    },
    email_usuario: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'El correo debe tener un formato válido.'
            },
            notNull: {
                msg: 'El correo es obligatorio.'
            },
        },
    },
    direccion_usuario: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La direccion del Usuario es obligatoria.'
            },
            is: {
                args: pattern_Direccion,
                msg: "La direccion del Usuario sólo puede contener letras, numeros y espacios"
            }
        },
    },
    sexo_usuario: {
        type: DataTypes.ENUM('M', 'F', 'Otro'),
        allowNull: true,
        validate: {
            isIn: {
                args: [
                    ['M', 'F', 'Otro']
                ],
                msg: 'El sexo debe ser M, F o Otro.',
            },
        },
    },
    dni_usuario: {
        type: DataTypes.STRING(20),
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El DNI es obligatorio.'
            },
            len: {
                args: [7, 20],
                msg: 'El DNI debe tener entre 7 y 20 caracteres.',
            },
            isAlphanumeric: {
                msg: 'El DNI solo puede contener letras y números.',
            },
        },
    },
    telefono_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isInt: true,
            min: 1000000000, // validación para números de 10 dígitos
            max: 9999999999,
        },
    },
    fecha_registro: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: "usuarios",
    tableName: "usuarios",
    timestamps: false,
    hooks: {
        beforeCreate: (usuario, options) => {
            usuario.nombre_usuario = usuario.nombre_usuario.trim();
        },
    },
})

export default Usuarios