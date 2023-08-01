const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('datn_databse', 'root', null, {
    host: 'localhost',
    dialect:"mysql",
    logging: false,
  });
module.exports = sequelize