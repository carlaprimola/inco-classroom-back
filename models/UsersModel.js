import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import RolesModel from './RolesModel.js';

const UsersModel = db.define('usuarios', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull:false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roles_ID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false
});

UsersModel.belongsTo(RolesModel, { foreignKey: 'roles_ID' });

export default UsersModel;


