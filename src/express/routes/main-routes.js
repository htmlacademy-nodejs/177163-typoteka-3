'use strict';

const { Router } = require(`express`);
const api = require(`../api`).getAPI();

const mainRouter = new Router();

mainRouter.get(`/`, async (req, res) => {
    const articles = await api.getArticles();
    res.render(`main`, { articles });
});
mainRouter.get(`/register`, (req, res) => res.render(`sign-up`));
mainRouter.get(`/login`, (req, res) => res.render(`login`));
mainRouter.get(`/search`, async (req, res) => {
    const {search} = req.query;
    if (!search) {
        return res.render(`search`);
    }
    try {
        const results = await api.search(search);
        return res.render(`search`, {results});
    } catch (error) {
        return res.render(`search`, {results: []});
    }
});
mainRouter.get(`/categories`, (req, res) => res.render(`all-categories`));

module.exports = mainRouter;
