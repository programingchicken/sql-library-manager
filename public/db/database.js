const { Sequelize } = require('sequelize');

//database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  host: './library.db'
})


module.exports = sequelize;