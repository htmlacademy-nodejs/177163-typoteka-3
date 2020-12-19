'use strict';

const chalk = require(`chalk`);
const express = require(`express`);
const fs = require(`fs`).promises;
const {
  FILE_NAME,
  DEFAULT_PORT
} = require(`./constants`);
const {
  HttpCode
} = require(`../../constants`);

const app = express();
app.use(express.json());

app.get(`/smth`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILE_NAME);
    const mocks = JSON.parse(fileContent);
    res.json(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err);
  }
});

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not Found`));

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    app.listen(port, (err) => {
      if (err) {
        return console.error(chalk.red(`An error occured on server creation: ${err}`));
      }
      return console.log(chalk.green(`Listening to connections on ${port}`));
    });
  },
};
