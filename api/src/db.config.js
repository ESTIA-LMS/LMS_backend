/*import des modules client sql server pour node.js*/

const { Sequelize } = require('sequelize')

/*Config de la connexion à la bdd */

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PWD,{  
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mssql'
})

 module.exports = sequelize

 