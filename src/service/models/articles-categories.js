'use strict';

const {Model} = require(`sequelize`);

class ArticleCategory extends Model { }

module.exports = (sequelize) => ArticleCategory.init({}, {
  sequelize,
  modelName: `ArticleCategory`,
  tableName: `articles_categories`,
});
