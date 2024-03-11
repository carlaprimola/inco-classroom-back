import db from '../database/db.js';
import { DataTypes } from 'sequelize';
import CoursesModel from './CoursesModel.js';


const ContentModel = db.define('contenidocursos', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    TituloMaterial: {
        type: DataTypes.STRING
    },
    TipoRecurso: {
        type: DataTypes.ENUM('Link', 'Video', 'Presentacion')
    },
    Contenido: {
        type: DataTypes.TEXT
    },
    Descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    cursos_ID: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, 
        {
        timestamps:false
        }
);

ContentModel.belongsTo(CoursesModel, { foreignKey: 'cursos_ID' });
export default ContentModel;
