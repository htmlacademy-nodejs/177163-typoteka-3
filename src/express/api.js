'use strict';

const axios = require(`axios`);
const { SERVICE_DEFAULT_PORT, API_PREFIX } = require("../constants");

const TIMEOUT = 1000;

const port = process.env.API_PORT || SERVICE_DEFAULT_PORT;
const defaultUrl = `http://localhost:${port}${API_PREFIX}/`

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

    getArticles() {
        return this._load(`/articles`);
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
