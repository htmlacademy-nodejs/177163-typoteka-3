'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {
  getRandomInt,
  getRandomItems,
  shuffle,
  getRandomDate,
  readContent,
} = require(`../../utils`);
const {
  FILE_NAME,
  GenerateFileRequirements: {
    DEFAULT_ARTICLES_COUNT,
    MAX_ARTICLES_COUNT,
    MAX_ARTICLES_MESSAGE,
    MONTH_INTERVAL,
    MAX_COMMENTS,
  },
  DataFilePath,
  MAX_ID_LENGTH,
} = require(`../../constants`);

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const generateOffers = (count, titles, sentences, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    category: getRandomItems(categories, getRandomInt(1, categories.length - 1)),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    fullText: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    createdAt: getRandomDate(MONTH_INTERVAL),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    try {
      const [sentences, categories, titles, comments] = await Promise.all([
        readContent(DataFilePath.SENTENCES),
        readContent(DataFilePath.CATEGORIES),
        readContent(DataFilePath.TITLES),
        readContent(DataFilePath.COMMENTS),
      ]);

      const [count] = args;
      const countOffer = Number.parseInt(count, 10) || DEFAULT_ARTICLES_COUNT;
      if (countOffer > MAX_ARTICLES_COUNT) {
        console.log(MAX_ARTICLES_MESSAGE);
        return;
      }
      const content = JSON.stringify(
          generateOffers(countOffer, titles, sentences, categories, comments),
          null, 4);
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`), err);
    }
  },
};
