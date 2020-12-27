'use strict';

const express = require(`express`);
const {getLogger} = require(`../lib/logger`);
const sequelize = require(`../lib/sequelize`);
const routes = require(`../api`);
const {
  HttpCode,
  API_PREFIX,
  SERVICE_DEFAULT_PORT: PORT,
} = require(`../../constants`);

const logger = getLogger({name: `api`});
const app = express();
app.use(express.json());

app.use(API_PREFIX, routes);

app.use((req, res, next) => {
  logger.debug(`Request on route ${req.url}`);
  res.on(`finish`, () => {
    logger.info(`Response status code ${res.statusCode}`);
  });
  next();
});

app.use((req, res) => {
  res
  .status(HttpCode.NOT_FOUND)
  .json(`Not Found`);

  logger.error(`Route not found: ${req.url}`);
});

app.use((err, _req, _res, _next) => {
  logger.error(`An error occured on processing request: ${err.message}`);
});

module.exports = {
  name: `--server`,
  async run(args) {
    try {
      logger.info(`Connecting to database...`);
      await sequelize.authenticate();
      logger.info(`Connected to database`);
    } catch (err) {
      logger.error(`Failed to connect to database: ${err}`);
      process.exit(1);
    }

    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || PORT;

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }
        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  },
};
