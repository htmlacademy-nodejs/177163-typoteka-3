'use strict';

const {Router} = require(`express`);
const sequelize = require(`../lib/sequelize`);
const search = require(`./search`);
const article = require(`./article`);
const category = require(`./category`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  category(app, new CategoryService(sequelize));
  article(app, new ArticleService(sequelize), new CommentService(sequelize));
  search(app, new SearchService(sequelize));
})();

module.exports = app;


