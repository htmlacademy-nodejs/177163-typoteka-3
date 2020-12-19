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


app.listen(PORT).on(`listening`, (err) => {
  if (err) {
    return console.error(`Ошибка при создании сервера`, err);
  }
  return console.info(chalk.green(`Ожидаю соединений на ${PORT}`));
});
