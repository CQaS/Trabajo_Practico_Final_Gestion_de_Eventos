import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {} from '../config.js'


class Evento extends Model {}

Evento.init({
    id_evento: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_evento: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'El nombre del evento es obligatorio.'
            },
            len: {
                args: [3, 100],
                msg: 'El nombre debe tener entre 3 y 100 caracteres.',
            },
        },
    },
    fecha_evento: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Debe ser una fecha válida.'
            },
            notNull: {
                msg: 'La fecha del evento es obligatoria.'
            },
        },
    },
    ubicacion_evento: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'La ubicación es obligatoria.'
            },
            len: {
                args: [5, 255],
                msg: 'La ubicación debe tener entre 5 y 255 caracteres.',
            },
        },
    },
    descripcion_evento: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    organizador_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Organizadores',
            key: 'id_organizador',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
}, {
    sequelize,
    tableName: 'Eventos',
    timestamps: false,
})

export default Evento