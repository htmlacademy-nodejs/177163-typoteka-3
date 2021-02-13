'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../data-service/search`);

const testDb = require(`../lib/db`);
const defineModels = require(`../models`);
defineModels(testDb);

const {HttpCode} = require(`../../constants`);

const articlesMock = [
  {
    "title": `Обзор новейшего смартфона`,
    "announce": `Первая большая ёлка была установлена только в 1938 году. Это один из лучших рок-музыкантов. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Собрать камни бесконечности легко, если вы прирожденный герой. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция. Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  },
  {
    "title": `Что такое золотое сечение`,
    "announce": `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Вы можете достичь всего. Стоит только немного постараться и запастись книгами. Программировать не настолько сложно, как об этом говорят. Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем. Как начать действовать? Для начала просто соберитесь.`,
    "fullText": `Это один из лучших рок-музыкантов. Первая большая ёлка была установлена только в 1938 году. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  },
];


const app = express();
app.use(express.json());
search(app, new DataService(testDb));

beforeAll(async () => {
  const category = await testDb.models.Category.create({name: `test category`});
  articlesMock.forEach(async (article) => {
    let createdArticle = await testDb.models.Article.create(article);
    createdArticle.addCategories([category]);
  });
});

afterAll(async () => {
  await testDb.models.Category.destroy({
    where: {},
    truncate: {cascade: true},
  });
  await testDb.models.Article.destroy({
    where: {},
    truncate: {cascade: true},
  });
});

describe(`API returns article based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/search`)
      .query({
        query: `Что такое золотое сечение`,
      });
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`1 article found`, () => expect(response.body.length).toBe(1));
});

test(`API returns code 404 if nothing is found`,
    () => request(app)
    .get(`/search`)
    .query({
      query: `Does anybody do this actually?`,
    })
    .expect(HttpCode.NOT_FOUND)
);

test(`API return 400 when query string is absent`,
    () => request(app)
    .get(`/search`)
    .expect(HttpCode.BAD_REQUEST)
);
