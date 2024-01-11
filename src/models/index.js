 import * as fs from 'fs';
import * as path from 'path';
import { sequelize } from '../../config/db.js';
import * as Sequelize  from 'sequelize';

const db = {}
db.Sequelize = Sequelize;
db.sequelize =sequelize;

import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);

// db.Users = require('./Users')(sequelize,DataTypes);

// reads all files/tables in models
fs.readdirSync(__dirname)
// For each file in the current directory (excluding index.js and files starting with '.')

  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model =  require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
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

export {db}