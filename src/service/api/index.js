'use strict';

const {Router} = require(`express`);
const db = require(`../lib/db`);
const search = require(`./search`);
const article = require(`./article`);
const category = require(`./category`);
const defineModels = require(`../models`);
const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

defineModels(db);

const initApi = async () => {
  const router = new Router();

  category(router, new CategoryService(db));
  article(router, new ArticleService(db), new CommentService(db));
  search(router, new SearchService(db));

  return router;
};

module.exports = initApi;


