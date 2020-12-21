'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const routes = require(`../api`);
const {
  HttpCode,
  API_PREFIX,
  SERVICE_DEFAULT_PORT: PORT,
} = require(`../../constants`);

const app = express();
app.use(express.json());

app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not Found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`An error occured on server creation: ${err}`));
      }
      return console.log(chalk.green(`Listening to connections on ${port}`));
    });
  },
};
