import db from '../database/db.js';
import { DataTypes } from 'sequelize'; 
import ContentModel from './ContentModel.js';


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
    },
    contenidocurso_ID: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false

});


CoursesModel.belongsTo(ContentModel, { foreignKey: 'contenidocurso_ID' });
// console.log(CoursesModel.hasMany(ContentModel))

export default CoursesModel;
