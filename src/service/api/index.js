'use strict';

const {Router} = require(`express`);
const search = require(`./search`);
const article = require(`./article`);
const category = require(`./category`);

const getMockData = require(`../lib/get-mock-data`);

const {
  CategoryService,
  SearchService,
  ArticleService,
  CommentService,
} = require(`../data-service`);

const app = new Router();

(async () => {
  const mockData = await getMockData();

  category(app, new CategoryService(mockData));
  article(app, new ArticleService(mockData), new CommentService());
  search(app, new SearchService(mockData));
})();

module.exports = app;


