import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const RolesModel = db.define('roles', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TipoRol: {
        type: DataTypes.ENUM('Estudiante', 'Docente'),
        allowNull: false
    }}, 
    {
    timestamps:false
    }
    
);



export default RolesModel;
