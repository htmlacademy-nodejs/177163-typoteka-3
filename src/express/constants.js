'use strict';

const resolvePath = require(`path`).resolve;

const DEFAULT_PORT = 8080;

const PUBLIC_DIR = resolvePath(__dirname, `./public`);
const TEMPLATES_DIR = resolvePath(__dirname, `./templates`);

module.exports = {
  DEFAULT_PORT,
  PUBLIC_DIR,
  TEMPLATES_DIR,
};
