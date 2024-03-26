import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import CoursesModel from './CoursesModel.js';

const CalendarModel = db.define('calendario', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    CursoID: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Fecha: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    DescripcionActividad: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Direccion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    
},{
    timestamps: false

});

CalendarModel.belongsTo(CoursesModel, { foreignKey: 'CursoID' });

export default CalendarModel;
