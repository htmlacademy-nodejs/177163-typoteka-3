'use strict';

const {Sequelize} = require(`sequelize`);
const defineModels = require(`../models`);

const {
  TEST_DB_NAME,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
  TEST_DB_HOST,
  TEST_DB_PORT,
  DB_TYPE,
} = require(`../../../config`);


const notDefined = [
  TEST_DB_NAME,
  TEST_DB_USER,
  TEST_DB_PASSWORD,
  TEST_DB_HOST,
  TEST_DB_PORT,
  DB_TYPE
].some((it) => it === undefined);

if (notDefined) {
  throw new Error(`One or more environmental variables are not defined`);
}

const testDb = new Sequelize(
    TEST_DB_NAME,
    TEST_DB_USER,
    TEST_DB_PASSWORD,
    {
      host: TEST_DB_HOST,
      port: TEST_DB_PORT,
      dialect: DB_TYPE,
      pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 10000,
      },
      logging: false,
    },
);

defineModels(testDb);

module.exports = testDb;

