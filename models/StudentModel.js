import db from '../database/db.js';
import { DataTypes } from 'sequelize';

const StudentModel = db.define('estudiantes', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuarios_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cursos_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seguimientoacademico_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

StudentModel.belongsTo(CoursesModel, { foreignKey: 'cursos_ID' });
StudentModel.belongsTo(AcademicTrackingModel, { foreignKey: 'seguimientoacademico_ID' });
StudentModel.belongsTo(UsersModel, { foreignKey: 'usuarios_ID' });

export default StudentModel;