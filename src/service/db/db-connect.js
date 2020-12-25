'use strict';

const { Sequelize } = require(`sequelize`);
const { getLogger } = require(`../lib/logger`);
const {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_TYPE,
} = require(`../../../config`);

const logger = getLogger({ name: `db` });

const connectToDb = async () => {
    const sequelize = new Sequelize(
        DB_NAME,
        DB_USER,
        DB_PASSWORD,
        {
            host: DB_HOST,
            port: DB_PORT,
            dialect: DB_TYPE,
        }
    );
    try {
        logger.debug(`Connecting to database...`);
        await sequelize.authenticate();
        logger.info(`Connected to database`);
    } catch (err) {
        logger.error(`Failed to connect to database: ${err}`);
        process.exit(1);
    }
};

module.exports = { connectToDb };
