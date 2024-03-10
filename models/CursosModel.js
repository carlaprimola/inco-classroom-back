import db from '../database/db.js'
import { DataTypes } from 'sequelize'
// import UsersModel from './UsersModel.js';

const CursosModel = db.define('cursos',{
    NombreCurso: {type: DataTypes.STRING},
    Descripcion:{type:DataTypes.TEXT},
    DocenteACargo:{type:DataTypes.INTEGER},
    imageUrl:{type: DataTypes.STRING}
    
},
{
    timestamps: false, // Desactivar control de tiempo de creación y actualización
});


// Establece la relación con el modelo de Usuarios
// CursosModel.belongsTo(UsersModel, { foreignKey: 'DocenteACargo', as: 'Docente' });


export default CursosModel