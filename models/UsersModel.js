import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const UsersModel = db.define('usuarios',{
    
    Nombre:{type:DataTypes.TEXT},
    Email:{type:DataTypes.TEXT},
    Contraseña:{type:DataTypes.TEXT},
    TipoUsuario: { 
        type: DataTypes.ENUM('Estudiante', 'Docente', 'Administrador'),
        defaultValue: 'Estudiante' // Puedes establecer un valor predeterminado si lo deseas
    }
   
},
{
    timestamps: false, // Desactivar control de tiempo de creación y actualización
});


export default UsersModel

