'use strict';

const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const faker = require(`faker`);
const defineModels = require(`../models`);
const Alias = require(`../models/aliases`);
const db = require(`../lib/db`);

const {
  getRandomInt,
  getRandomItems,
  shuffle,
  readContent,
} = require(`../../utils`);
const {
  GenerateFileRequirements: {
    DEFAULT_ARTICLES_COUNT,
    MAX_ARTICLES_COUNT,
    MAX_ARTICLES_MESSAGE,
    MAX_COMMENTS,
  },
  DataFilePath,
} = require(`../../constants`);


const generateCategories = (categories) =>
  categories.map((category) => ({name: category}));

const generateUsers = () =>
  Array(5).fill({}).map((it, index) => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: `${faker.internet.email()}`,
    password: nanoid(getRandomInt(5, 15)),
    avatar: `avatar-${index + 1}.png`,
  }));

const generateArticles = (count, titles, sentences, users, categories, comments) =>
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    fullText: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    picture: [`forest@1x.jpg`, `sea@1x.jpg`, `skyscrapper@1x.jpg`][getRandomInt(0, 2)],
    authorId: users[getRandomInt(0, users.length - 1)].id,
    categories: getRandomItems(categories, getRandomInt(1, categories.length - 1))
                .map((category) => category.id),
    [Alias.COMMENTS]: Array(getRandomInt(0, MAX_COMMENTS))
              .fill({})
              .map(() => ({
                text: shuffle(comments)
                  .slice(0, getRandomInt(1, 3))
                  .join(` `),
                authorId: users[getRandomInt(0, users.length - 1)].id,
              })),
  }));

module.exports = {
  name: `--filldb`,
  async run(args) {
    try {
      const [sentencesContent, categoriesContent, titlesContent, commentsContent] = await Promise.all([
        readContent(DataFilePath.SENTENCES),
        readContent(DataFilePath.CATEGORIES),
        readContent(DataFilePath.TITLES),
        readContent(DataFilePath.COMMENTS),
      ]);

      const [count] = args;
      const articlesCount = Number.parseInt(count, 10) || DEFAULT_ARTICLES_COUNT;
      if (articlesCount > MAX_ARTICLES_COUNT) {
        console.log(MAX_ARTICLES_MESSAGE);
        return;
      }

      const {User, Category, Article} = defineModels(db);
      await db.sync();

      const [categories, users] = await Promise.all([
        Category.bulkCreate(generateCategories(categoriesContent)),
        User.bulkCreate(generateUsers()),
      ]);

      const generatedArticles = generateArticles(
          articlesCount,
          titlesContent,
          sentencesContent,
          users,
          categories,
          commentsContent,
      );
      await Promise.all(
          generatedArticles
        .map(async (article) => {
          const createdArticle = await Article.create(article, {include: [Alias.COMMENTS]});
          await createdArticle.addCategories(article.categories);
        })
      );
      console.info(chalk.green(`DB has been filled`));
    } catch (err) {
      console.error(chalk.red(`Can't fill db `), err);
    }
  },
};
