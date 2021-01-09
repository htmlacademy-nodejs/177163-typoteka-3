'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const faker = require(`faker`);
const {
  getRandomInt,
  getRandomItems,
  shuffle,
  getRandomDate,
  readContent,
} = require(`../../utils`);

const {
  GenerateFileRequirements: {
    MAX_ARTICLES_COUNT,
    MAX_ARTICLES_MESSAGE,
    DEFAULT_ARTICLES_COUNT,
    MONTH_INTERVAL,
    MAX_COMMENTS,
  },
  FILL_FILE_NAME,
  DataFilePath,
} = require(`../../constants`);

const generateCategories = (categories) =>
  categories.map((category, index) => ({id: index + 1, name: category}));

const generateUsers = () =>
  Array(5).fill({}).map((it, index) => ({
    id: index + 1,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: `${faker.internet.email()}`,
    password: nanoid(getRandomInt(5, 15)),
    avatar: `avatar-${index + 1}.png`,
  }));

const generateArticles = (count, titles, sentences, users) =>
  Array(count).fill({}).map((it, index) => ({
    id: index + 1,
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    fullText: getRandomItems(sentences, getRandomInt(1, 5)).join(` `),
    createdAt: getRandomDate(MONTH_INTERVAL),
    picture: [`forest@1x.jpg`, `sea@1x.jpg`, `skyscrapper@1x.jpg`][getRandomInt(0, 2)],
    authorId: users[getRandomInt(0, users.length - 1)].id,
  }));

const generateArticlesCategories = (articles, categories) => {
  let articlesCategories = [];
  articles.forEach((article) => {
    const articleCategories = getRandomItems(categories, getRandomInt(1, categories.length - 1));
    articleCategories.forEach((articleCategory) => {
      articlesCategories = articlesCategories.concat({
        articleId: article.id,
        categoryId: articleCategory.id,
      });
    });
  });
  return articlesCategories;
};

const generateComments = (articles, users, comments) => {
  let commentsArr = [];
  articles.forEach((article) => {
    commentsArr = commentsArr.concat(
        Array(getRandomInt(0, MAX_COMMENTS))
        .fill({})
        .map(() => ({
          text: shuffle(comments)
            .slice(0, getRandomInt(1, 3))
            .join(` `),
          createdAt: article.createdAt,
          articleId: article.id,
          authorId: users[getRandomInt(0, users.length - 1)].id,
        }))
    );
  });
  return commentsArr;
};

const getCategoriesQuery = (categories) => (`
INSERT INTO public.categories (name) VALUES
${categories.map((category) => `\t('${category.name}')`).join(`,\n`)};
`);

const getUsersQuery = (users) => (`
INSERT INTO public.users (name, email, avatar, password) VALUES
${users.map((user) => `\t('${user.name}', '${user.email}', '${user.avatar}', '${user.password}')`).join(`,\n`)};
`);

const getArticlesQuery = (articles) => (`
INSERT INTO public.articles (title, announce, full_text, picture, created_date, author_id) VALUES
${articles
  .map((article) => `\t('${article.title}',
      '${article.announce}',
      '${article.fullText}',
      '${article.picture}',
      '${article.createdAt}',
      '${article.authorId}')`)
  .join(`,\n`)};
`);

const getArticlesCategoriesQuery = (articlesCategories) => (`
INSERT INTO public.articles_categories (article_id, category_id) VALUES
${articlesCategories.map((ac) => `\t('${ac.articleId}', '${ac.categoryId}')`).join(`,\n`)};
`);

const getCommentsQuery = (comments) => (`
INSERT INTO public.comments (text, created_date, article_id, author_id) VALUES
${comments
  .map((comment) => `\t('${comment.text}',
    '${comment.createdAt}',
    '${comment.articleId}',
    '${comment.authorId}')`)
  .join(`,\n`)};
`);

const getQuery = ({categories, users, articles, articlesCategories, comments}) => (`
TRUNCATE public.articles_categories, public.comments, public.articles, public.categories, public.users;

-- categories
${getCategoriesQuery(categories)}

-- users
${getUsersQuery(users)}

-- articles
${getArticlesQuery(articles)}

-- articlesCategories
${getArticlesCategoriesQuery(articlesCategories)}

-- comments
${getCommentsQuery(comments)}
`);

module.exports = {
  name: `--fill`,
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

      const categories = generateCategories(categoriesContent);
      const users = generateUsers();
      const articles = generateArticles(articlesCount, titlesContent, sentencesContent, users);
      const articlesCategories = generateArticlesCategories(articles, categories);
      const comments = generateComments(articles, users, commentsContent);

      const query = getQuery({categories, users, articles, articlesCategories, comments});

      fs.writeFile(FILL_FILE_NAME, query);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`), err);
    }

  },
};
