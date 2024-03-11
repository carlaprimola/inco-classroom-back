import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const AcademicTrackingModel = db.define('seguimientoacademico', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Comentarios: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Notas: {
        type: DataTypes.DECIMAL(4, 2),
        defaultValue: null
    },
    Evaluaciones: {
        type: DataTypes.TEXT,
        allowNull: true
    }}, 
    {
    timestamps:false
    }
    
);

export default AcademicTrackingModel;