'use strict';

const path = require(`path`);

const CountRequirements = {
  DEFAULT: 1,
  MAX: 1000,
  MAX_MESSAGE: `Не больше 1000 объявлений`,
};

const MONTH_INTERVAL = 3;

const FILE_NAME = path.resolve(path.join(__dirname, `../../../mocks.json`));

module.exports = {CountRequirements, MONTH_INTERVAL, FILE_NAME};
