'use strict';

const path = require(`path`);
const pino = require(`pino`);
const {Env} = require(`../../constants`);
const {NODE_ENV} = require(`../../../config`);

const LOG_FILE = path.resolve(__dirname, `../../../logs/api.log`);
const isDevMode = NODE_ENV === Env.DEVELOPMENT;
const defaultLogLevel = isDevMode ? `info` : `error`;

const logger = pino({
  name: `base-logger`,
  level: process.env.LOG_LEVEL || defaultLogLevel,
  prettyPrint: isDevMode,
}, isDevMode ? process.stdout : pino.destination(LOG_FILE));

module.exports = {
  logger,
  getLogger(options = {}) {
    return logger.child(options);
  }
};
