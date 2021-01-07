'use strict';

const {Op} = require(`sequelize`);

class SearchService {
  constructor(db) {
    this._articles = db.models.Article;
  }

  async findAll(searchText) {
    const articles = await this._articles.findAll({
      where: {
        title: {
          [Op.substring]: searchText,
        },
      },
      include: [],
    });
    return articles.map((article) => article.get());
  }
}

module.exports = SearchService;
