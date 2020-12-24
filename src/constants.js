'use strict';

const resolvePath = require(`path`).resolve;

const FILE_NAME = resolvePath(__dirname, `../mocks.json`);

const MAX_ID_LENGTH = 6;

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const GenerateFileRequirements = {
  DEFAULT_ARTICLES_COUNT: 1,
  MAX_ARTICLES_COUNT: 1000,
  MAX_ARTICLES_MESSAGE: `Не больше 1000 объявлений`,
  MONTH_INTERVAL: 3,
  MAX_COMMENTS: 5,
};

const SERVICE_DEFAULT_PORT = 3000;

const DataFilePath = {
  SENTENCES: resolvePath(__dirname, `../data/sentences.txt`),
  TITLES: resolvePath(__dirname, `../data/titles.txt`),
  CATEGORIES: resolvePath(__dirname, `../data/categories.txt`),
  COMMENTS: resolvePath(__dirname, `../data/comments.txt`),
};

const API_PREFIX = `/api`;

const FRONT_DEFAULT_PORT = 8080;

const FrontDir = {
  PUBLIC: resolvePath(__dirname, `./express/public`),
  TEMPLATES: resolvePath(__dirname, `./express/templates`),
  UPLOAD: resolvePath(__dirname, `../upload`),
};

const Env = {
  DEVELOPMENT: `development`,
  PRODUCTION: `production`,
};

module.exports = {
  HttpCode,
  FILE_NAME,
  GenerateFileRequirements,
  SERVICE_DEFAULT_PORT,
  MAX_ID_LENGTH,
  API_PREFIX,
  FRONT_DEFAULT_PORT,
  DataFilePath,
  FrontDir,
  Env,
};
