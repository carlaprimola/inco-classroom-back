import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import UsersModel from './UsersModel.js';
import CoursesModel from './CoursesModel.js';

const TeacherModel = db.define('profesor', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
    }
});

TeacherModel.belongsTo(CoursesModel, { foreignKey: 'cursos_ID' });
TeacherModel.belongsTo(UsersModel, { foreignKey: 'usuarios_ID' });

export default TeacherModel;
