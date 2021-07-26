export{};
const dbase = require('../data.config')
const { Sequelize, DataTypes } = require('sequelize');


const User = dbase.sequelize.define('users',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
     name: {
         type: Sequelize.STRING
     },
     email: {
        type: Sequelize.STRING
    },
    mobile: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
});
User.sync() 
module.exports = User