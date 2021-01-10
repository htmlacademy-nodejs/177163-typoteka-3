'use strict';

const axios = require(`axios`);
const {API_PREFIX} = require(`../constants`);
const {API_PORT} = require(`../../config`);

const TIMEOUT = 1000;
const ARTICLES_PAGE_COUNT = 8;

const defaultUrl = `http://localhost:${API_PORT}${API_PREFIX}/`;

class API {

  constructor(baseURL, timeout) {
    this._http = axios.create({
      baseURL,
      timeout,
    });
  }

  async _load(url, options) {
    const response = await this._http.request({url, ...options});
    return response.data;
  }

  async getArticles(page) {
    const params = {};
    if (page) {
      params.offset = (page - 1) * ARTICLES_PAGE_COUNT;
      params.limit = ARTICLES_PAGE_COUNT;
    }
    const result = await this._load(`/articles`, {params});
    return {
      articles: result.articles,
      totalPages: result.articlesCount && Math.ceil(result.articlesCount / ARTICLES_PAGE_COUNT),
    };
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  addArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data,
    });
  }

  async editArticle(id, data) {
    return this._load(`/articles/${id}`, {
      method: `PUT`,
      data,
    });
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }
}

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI,
};
