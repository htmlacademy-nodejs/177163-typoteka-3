'use strict';

const { Router } = require(`express`);
const path = require(`path`);
const multer = require(`multer`);
const { nanoid } = require(`nanoid`);
const api = require(`../api`).getAPI();
const UPLOAD_DIR = require(`../../constants`).FrontDir.UPLOAD;

const articlesRouter = new Router();

const storage = multer.diskStorage({
    destination: path.join(UPLOAD_DIR, `/img`),
    filename: (req, file, cb) => {
        const uniqueName = nanoid(10);
        const extension = file.originalname.split(`.`).pop();
        cb(null, `${uniqueName}.${extension}`);
    }
});

const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));
articlesRouter.get(`/add`, (req, res) => res.render(`articles/new-post`));
articlesRouter.get(`/edit/:id`, async (req, res) => {
    const article = await api.getArticle(req.params.id);
    return res.render(`articles/new-post`, { article });
});
articlesRouter.post(`/add`, upload.single(`upload`), async (req, res) => {
    const {body, file} = req;
    const article = {
        picture: file && file.filename,
        category: body.category,
        title: body.title,
        announce: body.announcement,
        fullText: body[`full-text`],
    };
    try {
        const t = await api.addArticle(article);
        res.redirect(`/my`);
    } catch (err) {
        res.redirect(`back`);
    }
});
articlesRouter.post(`/edit/:id`, upload.single(`upload`), async (req, res) => {
    const {body, file} = req;
    const article = {
        picture: file && file.filename,
        title: body.title,
        announce: body.announcement,
        fullText: body[`full-text`],
    };
    if (body.category) {
        article.category = category;
    }
    try {
        await api.editArticle(req.params.id, article);
        res.redirect(`/my`);
    } catch (err) {
        res.redirect(`back`);
    }
});
articlesRouter.get(`/:id`, async (req, res) => {
    const article = await api.getArticle(req.params.id);
    return res.render(`articles/post`, {article});
});

module.exports = articlesRouter;
