import db from '../database/db.js';
import { DataTypes } from 'sequelize';


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
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});


ContentModel.belongsTo(db.models.CoursesModel, { foreignKey: 'contenidocursos_ID' });

export default ContentModel;
