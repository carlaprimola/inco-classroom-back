import {Sequelize} from 'sequelize'
const db = new Sequelize('inco','inco','W#84pqf85', {
   host:'49.13.192.32',
   dialect:'mysql',
   define: {
      freezeTableName: true // Esto desactiva la pluralización automática de Sequelize
  }
});

export default db




