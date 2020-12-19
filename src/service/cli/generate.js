'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {
  getRandomInt,
  getRandomItems,
} = require(`../../utils`);

const {
  CountRequirements,
  MONTH_INTERVAL,
  FILE_NAME,
  FILE_CATEGORIES_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLES_PATH,
} = require(`./constants`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

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

const generateOffers = (count, titles, sentences, categories) => (
  Array(count).fill({}).map(() => ({
    category: getRandomItems(categories, getRandomInt(1, categories.length - 1)),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    fullText: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    createdDate: getRandomDate(),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    try {
      const sentences = await readContent(FILE_SENTENCES_PATH);
      const categories = await readContent(FILE_CATEGORIES_PATH);
      const titles = await readContent(FILE_TITLES_PATH);

      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || CountRequirements.DEFAULT;
      if (countOffer > CountRequirements.MAX) {
        console.log(CountRequirements.MAX_MESSAGE);
        return;
      }
      const content = JSON.stringify(
          generateOffers(countOffer, titles, sentences, categories),
          null, 4);
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
