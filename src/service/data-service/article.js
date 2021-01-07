'use strict';

const Alias = require(`../models/aliases`);

class ArticleService {
  constructor(db) {
    this._articles = db.models.Article;
  }

  async findAll() {
    const articles = await this._articles.findAll({
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
    return articles;
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
