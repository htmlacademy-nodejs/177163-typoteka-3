'use strict';

const Alias = require(`../models/aliases`);

class ArticleService {
  constructor(sequelize) {
    this._Article = sequelize.models.Article;
  }

  async findAll() {
    const articles = await this._Article.findAll({
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
    return articles;
  }

  async findOne(id) {
    return this._Article.findByPk(id, {
      include: [Alias.CATEGORIES, Alias.COMMENTS],
    });
  }

  async create(articleData) {
    const newArticle = await this._Article.create(articleData);
    await newArticle.addCategories(articleData.categories);
    return newArticle.get();
  }

  async update(id, changedArticle) {
    const [affected] = await this._Article.update(changedArticle, {
      where: {id},
    });
    return !!affected;
  }

  async drop(id) {
    const deleted = await this._Article.destroy({
      where: {id},
    });
    return !!deleted;
  }
}

module.exports = ArticleService;
