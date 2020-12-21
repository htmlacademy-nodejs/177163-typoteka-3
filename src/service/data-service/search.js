'use strict';

class SearchService {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchText) {
    const r = this._articles
    .filter((article) => article.title.includes(searchText));
    return r;
  }
}

module.exports = SearchService;
