import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const ContentModel = db.define('contenidocursos',{
    TituloMaterial: {type: DataTypes.STRING},
    TipoRecurso: { 
        type: DataTypes.ENUM('Link', 'Video', 'Presentacion'),
        defaultValue: 'Link' 
    },
    Contenido:{type:DataTypes.TEXT}   
},
{
    timestamps: false, // Desactivar control de tiempo de creación y actualización
});


export default ContentModel