import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import UsersModel from './UsersModel.js';
import CoursesModel from './CoursesModel.js';
import AcademicTrackingModel from './AcademicTrackingModel.js'

const StudentModel = db.define('estudiantes', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    usuarios_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UsersModel,
            key: 'ID'
          }
    },
    cursos_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: CoursesModel,
            key: 'ID'
          }
    },
    seguimientoacademico_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AcademicTrackingModel,
            key: 'ID'
          }
    }
});

StudentModel.belongsTo(CoursesModel, { foreignKey: 'cursos_ID' });
StudentModel.belongsTo(AcademicTrackingModel, { foreignKey: 'seguimientoacademico_ID' });
StudentModel.belongsTo(UsersModel, { foreignKey: 'usuarios_ID' });

export default StudentModel;