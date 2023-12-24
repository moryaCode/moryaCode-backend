const { Sequelize } = require("sequelize");
require('dotenv').config();
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sequelize = new Sequelize({
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: true, // This is more secure, it will reject unauthorized connections
    },
  },
});

const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    let data = await sequelize.query(`select * from users`, {
      type: sequelize.QueryTypes.SELECT,
      raw: true
    });
    console.log(data);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDbConnection();



module.exports = { db: sequelize, testDbConnection };