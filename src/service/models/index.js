'use strict';

"use strict";

const {Model} = require(`sequelize`);
const Alias = require(`./aliases`);
const defineCategory = require(`./categories`);
const defineUser = require(`./users`);
const defineArticle = require(`./articles`);
const defineComment = require(`./comments`);
const defineArticleCategory = require(`./articles-categories`);


const define = (sequelize) => {
  const User = defineUser(sequelize);
  const Category = defineCategory(sequelize);
  const Article = defineArticle(sequelize);
  const Comment = defineComment(sequelize);
  const ArticleCategory = defineArticleCategory(sequelize);

  User.hasMany(Article, {as: Alias.ARTICLES, foreignKey: `authorId`});
  Article.belongsTo(User, {foreignKey: `authorId`});

  Article.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `articleId`});
  Comment.belongsTo(Article, {foreignKey: `articleId`});

  User.hasMany(Comment, {as: Alias.COMMENTS, foreignKey: `authorId`});
  Comment.belongsTo(User, {foreignKey: `authorId`});

  Article.belongsToMany(Category, {as: Alias.CATEGORIES, through: ArticleCategory});
  Category.belongsToMany(Article, {as: Alias.ARTICLES, through: ArticleCategory});

  // sequelize.getQueryInterface().chnageColumn(`articles_categories`, ``);

  return {User, Category, Article, Comment, ArticleCategory};
};

module.exports = define;
