const Sequelize  = require('sequelize');
const sequelize = new Sequelize('blogapp', 'user', 'resu', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = {
  sequelize,
}