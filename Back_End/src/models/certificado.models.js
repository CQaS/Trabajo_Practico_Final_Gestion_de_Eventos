import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {} from '../config.js'


class Certificados extends Model {}

Certificados.init({
    id_certificado: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    registro_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'registro_asistencia',
            key: 'id_registro',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    url_certificado: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isUrl: {
                msg: 'Debe ser una URL válida.'
            },
            notNull: {
                msg: 'La URL del certificado es obligatoria.'
            },
        },
    },
    fecha_emision: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Fecha de emision debe ser una fecha válida.'
            },
        },
    },
}, {
    sequelize,
    tableName: 'Certificados',
    timestamps: false,
})

export default Certificados