'use strict';

var resolvePath = require("path").resolve;

var CountRequirements = {
  DEFAULT: 1,
  MAX: 1000,
  MAX_MESSAGE: "\u041D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 1000 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439"
};
var MONTH_INTERVAL = 3;
var FILE_NAME = resolvePath(__dirname, "../../../mocks.json");
var FILE_SENTENCES_PATH = resolvePath(__dirname, "../../../data/sentences.txt");
var FILE_TITLES_PATH = resolvePath(__dirname, "../../../data/titles.txt");
var FILE_CATEGORIES_PATH = resolvePath(__dirname, "../../../data/categories.txt");
var FILE_COMMENTS_PATH = resolvePath(__dirname, "../../../data/comments.txt");
var DEFAULT_PORT = 3000;
var MAX_ID_LENGTH = 6;
var MAX_COMMENTS = 5;
module.exports = {
  CountRequirements: CountRequirements,
  MONTH_INTERVAL: MONTH_INTERVAL,
  FILE_NAME: FILE_NAME,
  FILE_SENTENCES_PATH: FILE_SENTENCES_PATH,
  FILE_TITLES_PATH: FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH: FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH: FILE_COMMENTS_PATH,
  DEFAULT_PORT: DEFAULT_PORT,
  MAX_ID_LENGTH: MAX_ID_LENGTH,
  MAX_COMMENTS: MAX_COMMENTS
};