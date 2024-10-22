import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {} from '../config.js'


class Organizador extends Model {}

Organizador.init({
    id_organizador: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_organizador: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre del organizador es obligatorio.'
            },
            len: {
                args: [3, 100],
                msg: 'El nombre debe tener entre 3 y 100 caracteres.',
            },
        },
    },
    email_organizador: {
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
    tipo_organizador: {
        type: DataTypes.ENUM('persona', 'empresa'),
        allowNull: false,
        validate: {
            isIn: {
                args: [
                    ['persona', 'empresa']
                ],
                msg: 'El tipo debe ser persona o empresa.',
            },
            notNull: {
                msg: 'El tipo de organizador es obligatorio.'
            },
        },
    },
    nombre_empresa: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
            len: {
                args: [3, 255],
                msg: 'El nombre de la empresa debe tener entre 3 y 255 caracteres.',
            },
        },
    },
    nif_empresa: {
        type: DataTypes.STRING(20),
        allowNull: true,
        unique: true,
        validate: {
            len: {
                args: [5, 20],
                msg: 'El NIF debe tener entre 5 y 20 caracteres.',
            },
            isAlphanumeric: {
                msg: 'El NIF solo puede contener letras y números.',
            },
        },
    },
}, {
    sequelize,
    tableName: 'Organizadores',
    timestamps: false,
    hooks: {
        beforeCreate: (organizador, options) => {
            if (organizador.tipo_organizador === 'persona') {
                organizador.nombre_empresa = null;
                organizador.nif_empresa = null;
            }
        },
    },
});

export default Organizador;