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
    Date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    ActivityDescription: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

CalendarModel.belongsTo(CoursesModel, { foreignKey: 'CourseID' });

export default CalendarModel;
