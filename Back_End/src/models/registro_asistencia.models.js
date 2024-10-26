import SDM from "../db/sequelize_db.js"
const {
    sequelize,
    DataTypes,
    Model
} = SDM
import {} from '../config.js'


class RegistroAsistencia extends Model {}

RegistroAsistencia.init({
    id_registro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id_usuario',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    evento_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Eventos',
            key: 'id_evento',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    asistio: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            isIn: {
                args: [
                    [true, false]
                ],
                msg: 'El campo asistió debe ser verdadero o falso.',
            },
        },
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Fecha de Registrio debe ser una fecha válida.'
            },
        },
    },
    fecha_confirmacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        validate: {
            isDate: {
                msg: 'Fecha de Confirmacion debe ser una fecha válida.'
            },
        },
    },
}, {
    sequelize,
    tableName: 'Registro_Asistencia',
    timestamps: false,
    indexes: [{
        unique: true,
        fields: ['usuarioId', 'evento_id'],
        msg: 'El usuario ya está registrado en este evento.',
    }, ],
})

export default RegistroAsistencia