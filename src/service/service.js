'use strict';

const chalk = require(`chalk`);
const {Cli} = require(`./cli`);

const DEFAULT_COMMAND = `--help`;

const userArguments = process.argv.slice(2);
const [userCommand] = userArguments;

process.on(`uncaughtException`, (err) => {
  console.error(chalk.red(err));
  process.exit(1);
});

if (userArguments.length === 0 || !Cli[userCommand]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit();
}

Cli[userCommand].run(userArguments.slice(1));
