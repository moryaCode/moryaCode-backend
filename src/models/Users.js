const { Sequelize, DataTypes, Model } = require('sequelize');
import { sequelize } from '../config/db';
class User extends Model { }

User.init({
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User',
  tableName: 'users'// We need to choose the model name
});

// the defined model is the class itself
console.log(User === sequelize.models.User); // true


module.exports = User;