'use strict';

const Alias = require(`../models/aliases`);

class ArticleService {
  constructor(db) {
    this._articles = db.models.Article;
  }

  async findAll() {
    const {rows: articles, count: articlesCount} = await this._articles.findAndCountAll({
      include: [Alias.CATEGORIES, Alias.COMMENTS],
      distinct: true,
    });
    return {articles, articlesCount};
  }

  async findRange({offset, limit}) {
    const {rows: articles, count: articlesCount} = await this._articles.findAndCountAll({
      offset,
      limit,
      include: [Alias.CATEGORIES, Alias.COMMENTS],
      distinct: true,
    });
    return {articles, articlesCount};
  }

  async findOne(id) {
    return await this._articles.findByPk(id, {
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
  }

  async create(articleData) {
    const newArticle = await this._articles.create(articleData);
    await newArticle.addCategories(articleData.category);
    return newArticle.get();
  }

  async update(id, changedArticleData) {
    const affectedArticle = await this._articles.findByPk(id);
    const categories = await affectedArticle.getCategories();
    await affectedArticle.removeCategories(categories);
    await affectedArticle.update(changedArticleData);
    await affectedArticle.addCategories(changedArticleData.category);

    return affectedArticle.get();
  }

  async drop(id) {
    const deleted = await this._articles.destroy({
      where: {id},
    });
    return !!deleted && id;
  }
}

module.exports = ArticleService;
