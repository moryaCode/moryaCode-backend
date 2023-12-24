const sequelize = require('../config/db');
const {sequelize, datatypes} = require('sequelize');

const db = {}
db.Sequelize = Sequelize;
db.sequelize =sequelize;

db.sequelize.sync({force:false}).then(()=>{
    console.log('synced');
})

db.Users = require('./Users')(sequelize,DataTypes);
module.exports  = db;