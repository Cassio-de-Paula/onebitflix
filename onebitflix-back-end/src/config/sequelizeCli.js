require("dotenv").config();

module.exports = {
  development: {
    dialect: "postgres",
    url: process.env.DATABASE_URL,
  },
  production: {
    url: process.env.DARABASE_URL,
  },
};
