import {Sequelize} from 'sequelize'
const db = new Sequelize('incodb','admin','12345678', {
   host:'inco-db.cvmg4a04y9b6.eu-north-1.rds.amazonaws.com',
   dialect:'mysql'
});

export default db




//  conexion a la base de datos