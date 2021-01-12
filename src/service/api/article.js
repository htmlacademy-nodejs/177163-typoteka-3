'use strict';

const { Router } = require(`express`);
const articleExists = require(`../middlewares/article-exists`);
const idValidator = require("../middlewares/id-validator");
const schemaValidator = require(`../middlewares/schema-validator`);
const { articleSchema, commentSchema } = require(`../validation-schemas`);
const { HttpCode } = require(`../../constants`);

const route = new Router();

module.exports = (router, articleService, commentService) => {
  router.use(`/articles`, route);

  // returns object {articles: [...], articlesCount: N}
  route.get(`/`, async (req, res) => {
    const { offset, limit } = req.query;
    let result;
    if (offset || limit) {
      result = await articleService.findRange({ offset, limit });
    } else {
      result = await articleService.findAll();
    }
    res.status(HttpCode.OK).json(result);
  });

  route.get(`/:articleId`, articleExists(articleService), async (req, res) => {
    const { articleId } = req.params;
    const article = await articleService.findOne(articleId);

    return res.status(HttpCode.OK).json(article);
  });

  route.post(`/`, schemaValidator(articleSchema), async (req, res) => {
    const article = await articleService.create(req.body);
    return res.status(HttpCode.CREATED)
      .json(article);
  });

  route.put(`/:articleId`,
    [articleExists(articleService), schemaValidator(articleSchema)],
    async (req, res) => {
      const { articleId } = req.params;

      const updatedArticle = await articleService.update(articleId, req.body);
      return res.status(HttpCode.OK)
        .json(updatedArticle);
    });

  route.delete(`/:articleId`, idValidator(`articleId`), async (req, res) => {
    const { articleId } = req.params;

    const deletedArticle = await articleService.drop(articleId);
    if (!deletedArticle) {
      res.status(HttpCode.NOT_FOUND).json(`Not found`);
      return;
    }

    res.status(HttpCode.OK)
      .json(deletedArticle);
  });

  route.get(
    `/:articleId/comments`,
    [idValidator(`articleId`), articleExists(articleService)],
    async (req, res) => {
      const { articleId } = req.params;
      const comments = await commentService.findAll(articleId);

      res.status(HttpCode.OK)
        .json(comments);
    });

  route.delete(
    `/:articleId/comments/:commentId`,
    [
      idValidator(`articleId`),
      articleExists(articleService),
      idValidator(`commentId`),
    ],
    async (req, res) => {
      const { commentId } = req.params;
      const deletedComment = await commentService.drop(commentId);

      if (!deletedComment) {
        return res.status(HttpCode.NOT_FOUND)
          .json(`Not found`);
      }

      return res.status(HttpCode.OK)
        .json(deletedComment);
    }
  );

  route.post(
    `/:articleId/comments`,
    [
      idValidator(`articleId`),
      articleExists(articleService),
      schemaValidator(commentSchema),
    ],
    async (req, res) => {
      const { articleId } = req.params;
      const comment = await commentService.create(articleId, req.body);

      return res.status(HttpCode.CREATED)
        .json(comment);
    });

};
