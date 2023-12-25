const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db');
const {Sequelize, DataTypes} = require('sequelize');

const db = {}
db.Sequelize = Sequelize;
db.sequelize =sequelize;

// db.Users = require('./Users')(sequelize,DataTypes);

// reads all files/tables in models
fs.readdirSync(__dirname)
// For each file in the current directory (excluding index.js and files starting with '.')

  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    // Import the model from the file and associate it with Sequelize
    db.models[model.name] = model;
    // Add the imported model to the 'db' object under its name
});


Object.keys(db.models)
  .forEach((modelName) => {
    if (typeof db.models[modelName].associate === 'function') {
      db.models[modelName].associate(db.models);
    }
  });

module.exports  = db;