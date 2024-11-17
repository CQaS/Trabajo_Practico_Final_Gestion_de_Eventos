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


class Invalid_tokens extends Model {}

Invalid_tokens.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING(1024),
        allowNull: false,
        unique: true,
    },
    invalido_en: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Invalid_tokens',
    tableName: 'invalid_tokens',
    timestamps: false,
})

export default Invalid_tokens