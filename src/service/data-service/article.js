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
    return this._articles.findByPk(id, {
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
  }

  async create(articleData) {
    const newArticle = await this._articles.create(articleData);
    await newArticle.addCategories(articleData.categories);
    return newArticle.get();
  }

  async update(id, changedArticle) {
    const [affected] = await this._articles.update(changedArticle, {
      where: {id},
    });
    return !!affected;
  }

  async drop(id) {
    const deleted = await this._articles.destroy({
      where: {id},
    });
    return !!deleted;
  }
}

module.exports = ArticleService;
