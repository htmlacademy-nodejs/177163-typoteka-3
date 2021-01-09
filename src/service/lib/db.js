'use strict';

const {Sequelize} = require(`sequelize`);
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_TYPE,
} = require(`../../../config`);

const notDefined = [
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_TYPE
].some((it) => it === undefined);

if (notDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

module.exports = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
      host: DB_HOST,
      port: DB_PORT,
      dialect: DB_TYPE,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
      },
    },
);
