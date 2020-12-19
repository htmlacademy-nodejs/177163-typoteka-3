'use strict';

const resolvePath = require(`path`).resolve;

const CountRequirements = {
  DEFAULT: 1,
  MAX: 1000,
  MAX_MESSAGE: `Не больше 1000 объявлений`,
};

const MONTH_INTERVAL = 3;

const FILE_NAME = resolvePath(__dirname, `../../../mocks.json`);
const FILE_SENTENCES_PATH = resolvePath(__dirname, `../../../data/sentences.txt`);
const FILE_TITLES_PATH = resolvePath(__dirname, `../../../data/titles.txt`);
const FILE_CATEGORIES_PATH = resolvePath(__dirname, `../../../data/categories.txt`);

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const DEFAULT_PORT = 3000;

module.exports = {
  CountRequirements,
  MONTH_INTERVAL,
  FILE_NAME,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  HttpCode,
  DEFAULT_PORT,
};
