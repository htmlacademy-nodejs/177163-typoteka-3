'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const articlesRouter = require(`./routes/articles-routes`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);

const {
  DEFAULT_PORT: PORT,
  PUBLIC_DIR,
  TEMPLATES_DIR
} = require(`./constants`);
const {
  HttpCode
} = require(`../constants`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);

app.use(express.static(PUBLIC_DIR));
app.set(`views`, TEMPLATES_DIR);
app.set(`view engine`, `pug`);

app.use((req, res) => res.status(HttpCode.NOT_FOUND).render(`errors/404`));
app.use((err, _req, res, _next) => {
  console.log(err);
  res
    .status(HttpCode.INTERNAL_SERVER_ERROR)
    .render(`errors/500`);
});

app.listen(PORT, (err) => {
  if (err) {
    return console.error(`An error occured on server creation`, err);
  }
  return console.info(chalk.green(`Listening to connections on ${PORT}`));
});
