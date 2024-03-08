import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const CursosModel = db.define('cursos',{
    NombreCurso: {type: DataTypes.STRING},
    Descripcion:{type:DataTypes.TEXT},
    DocenteACargo:{type:DataTypes.INTEGER},
    imageUrl:{type: DataTypes.STRING}
    
},
{
    timestamps: false, // Desactivar control de tiempo de creación y actualización
});


export default CursosModel