'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  getRandomItems,
} = require(`../../utils`);
const {TITLES, SENTENCES, CATEGORIES} = require(`./samples`);
const {CountRequirements, MONTH_INTERVAL, FILE_NAME} = require(`./constants`);

const getTwoDigitsStr = (num) => num > 9 ? num : `0${num}`;

const getRandomDate = () => {
  let now = new Date();
  let then = (new Date(now)).setMonth(now.getMonth() - MONTH_INTERVAL);
  const randomDate = new Date(getRandomInt(then, Date.parse(now)));

  let [year, month, date, hours, minutes, seconds] = [
    randomDate.getFullYear(),
    getTwoDigitsStr(randomDate.getMonth() + 1),
    getTwoDigitsStr(randomDate.getDate()),
    getTwoDigitsStr(randomDate.getHours()),
    getTwoDigitsStr(randomDate.getMinutes()),
    getTwoDigitsStr(randomDate.getSeconds()),
  ];

  return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: getRandomItems(CATEGORIES, getRandomInt(1, CATEGORIES.length - 1)),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: getRandomItems(SENTENCES, getRandomInt(1, 5)).join(` `),
    fullText: getRandomItems(SENTENCES, getRandomInt(1, 5)).join(` `),
    createdDate: getRandomDate(),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || CountRequirements.DEFAULT;
    if (countOffer > CountRequirements.MAX) {
      console.log(CountRequirements.MAX_MESSAGE);
      return;
    }
    const content = JSON.stringify(generateOffers(countOffer), null, 4);
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
