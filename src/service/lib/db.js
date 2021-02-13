'use strict';

const {Sequelize} = require(`sequelize`);
const env = require(`../../../config`);

const prfx        = env.NODE_ENV === `test` ? `TEST_` : ``;
const dbName      = env[`${prfx}DB_NAME`];
const dbUser      = env[`${prfx}DB_USER`];
const dbPassword  = env[`${prfx}DB_PASSWORD`];
const dbHost      = env[`${prfx}DB_HOST`];
const dbPort      = env[`${prfx}DB_PORT`];
const dbType      = env[`DB_TYPE`];

const notDefined = [
  dbName,
  dbUser,
  dbPassword,
  dbHost,
  dbPort,
].some((it) => it === undefined);

if (notDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

module.exports = new Sequelize(
    dbName,
    dbUser,
    dbPassword,
    {
      host: dbHost,
      port: dbPort,
      dialect: dbType,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
      },
    },
);
