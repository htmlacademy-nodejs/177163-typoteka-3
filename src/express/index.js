'use strict';

const express = require(`express`);
const articlesRouter = require(`./routes/articles-routes`);
const mainRouter = require(`./routes/main-routes`);
const myRouter = require(`./routes/my-routes`);
const {
  DEFAULT_PORT: PORT
} = require(`./constants`);
const chalk = require(`chalk`);

const app = express();

app.use(`/`, mainRouter);
app.use(`/my`, myRouter);
app.use(`/articles`, articlesRouter);


app.listen(PORT, (err) => {
  if (err) {
    return console.error(`An error occured on server creation`, err);
  }
  return console.info(chalk.green(`Listening to connections on ${PORT}`));
});
