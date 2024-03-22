import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const AcademicTrackingModel = db.define('seguimientoacademico', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Curso:{
        type: DataTypes.STRING,
        allowNull:false
    },
    Actividades: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Comentarios: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Notas: {
        type: DataTypes.DECIMAL(4, 2),
        defaultValue: null
    },
    Estado: {
        type: DataTypes.ENUM('Calificado', 'Pendiente'),
        allowNull: false,
        defaultValue: 'Pendiente'
    }
}, 
    {
    timestamps:false,
    tableName: 'seguimientoacademico'
    },
    
    
);

export default AcademicTrackingModel;