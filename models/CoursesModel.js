import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import ContentModel from './ContentModel.js'; // Importar el modelo de Contenido de Cursos

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
    contenidocursos_ID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: false

});

CoursesModel.belongsTo(ContentModel, { foreignKey: 'contenidocursos_ID' });

export default CoursesModel;
