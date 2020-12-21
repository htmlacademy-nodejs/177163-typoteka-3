'use strict';

const {Router} = require(`express`);
const articleValidator = require(`../middlewares/article-validator`);
const articleExists = require(`../middlewares/article-exists`);
const commentValidator = require(`../middlewares/comment-validator`);
const {HttpCode} = require(`../../constants`);

const route = new Router();

module.exports = (app, articleService, commentService) => {
  app.use(`/articles`, route);

  route.get(`/`, (req, res) => {
    const articles = articleService.findAll();
    res.status(HttpCode.OK).json(articles);
  });

  route.get(`/:id`, (req, res) => {
    const {id} = req.params;
    const article = articleService.findOne(id);
    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${id}`);
    }

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, articleValidator, (req, res) => {
    const article = articleService.create(req.body);
    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:id`, articleValidator, (req, res) => {
    const {id} = req.params;
    const existedArticle = articleService.findOne(id);

    if (!existedArticle) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${id}`);
    }

    const updatedArticle = articleService.update(id, req.body);
    return res.status(HttpCode.OK)
      .json(updatedArticle);
  });

  route.delete(`/:id`, (req, res) => {
    const {id} = req.params;

    const deletedArticle = articleService.drop(id);
    if (!deletedArticle) {
      res.status(HttpCode.NOT_FOUND).send(`Not found`);
      return;
    }

    res.status(HttpCode.OK)
      .json(deletedArticle);
  });

  route.get(`/:articleId/comments`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const comments = commentService.findAll(article);

    res.status(HttpCode.OK)
      .json(comments);
  });

  route.delete(`/:articleId/comments/:commentId`, articleExists(articleService), (req, res) => {
    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  });

  route.post(`/:articleId/comments`, [articleExists(articleService), commentValidator], (req, res) => {
    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    return res.status(HttpCode.OK)
      .json(comment);
  });

};
