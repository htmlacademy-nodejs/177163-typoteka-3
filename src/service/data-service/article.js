'use strict';

const {nanoid} = require(`nanoid`);
const {
  MAX_ID_LENGTH
} = require(`../../constants`);

class ArticleService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((it) => it.id === id);
  }

  create(article) {
    const newArticle = {
      ...article,
      comments: [],
      id: nanoid(MAX_ID_LENGTH)
    };
    this._articles.push(newArticle);
  }

  update(id, changedArticle) {
    const oldArticleIndex = this._articles.findIndex((it) => it.id === id);
    const updatedArticle = {...this._articles[oldArticleIndex], ...changedArticle};
    this._articles[oldArticleIndex] = updatedArticle;
    return updatedArticle;
  }

  drop(id) {
    const article = this._articles.find((it) => it.id === id);
    if (!article) {
      return null;
    }

    this._articles = this._articles.filter((it) => it.id !== id);
    return article;
  }
}

module.exports = ArticleService;
