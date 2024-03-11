import db from '../database/db.js';
import { DataTypes } from 'sequelize';


const CoursesModel = db.define('cursos', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    NombreCurso: {
        type: DataTypes.STRING
    },
    imageUrl: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false

});



export default CoursesModel;
