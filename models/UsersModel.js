import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import RolesModel from './RolesModel.js';


const UsersModel = db.define('usuarios', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull:true
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
        allowNull: false
    },
    imgProfile: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
}, 
{
    timestamps: false,
    // Configuración de la referencia de la clave foránea
    references: {
        model: RolesModel,
        key: 'ID'
    }
});

UsersModel.belongsTo(RolesModel, { foreignKey: 'roles_ID' });


export default UsersModel;


