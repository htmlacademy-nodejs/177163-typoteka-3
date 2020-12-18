'use strict';

const express = require(`express`);
const articlesRouter = require("./routes/articles-routes");
const mainRouter = require("./routes/main-routes");
const myRouter = require("./routes/my-routes");
const {DEFAULT_PORT: PORT} = require(`./constants`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.listen(PORT);