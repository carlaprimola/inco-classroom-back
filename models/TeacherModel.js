import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const TeacherModel = db.define('profesor', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    usuarios_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cursos_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

TeacherModel.belongsTo(CoursesModel, { foreignKey: 'cursos_ID' });
TeacherModel.belongsTo(UsersModel, { foreignKey: 'usuarios_ID' });

export default TeacherModel;
