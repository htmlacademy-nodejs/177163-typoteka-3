'use strict';

const express = require(`express`);
const request = require(`supertest`);

const category = require(`./category`);
const DataService = require(`../data-service/category`);
const testDb = require(`../lib/testdb`);

const { HttpCode } = require(`../../constants`);

const categoriesMock = [
  `Кино`,
  `Без рамки`,
  `Железо`,
  `Программирование`,
  `За жизнь`,
  `Музыка`,
  `IT`
];

const app = express();
app.use(express.json());
category(app, new DataService(testDb))

beforeAll(async ()  => {
  await testDb.models.Category.bulkCreate(categoriesMock.map(c => ({ name: c })));
});

afterAll(async () => {
  await testDb.models.Category.destroy({
    where: {},
    truncate: {cascade: true},
  });
});

describe(`API returns category list`, () => {
  let response;
  beforeAll(async () => {
    response = await request(app)
    .get(`/categories`);
  });
  test(`Status code 200`, async () => {
    expect(response.statusCode).toBe(HttpCode.OK);
  });
  test(`${categoriesMock.length} categories found`, async () => {
    expect(response.body.length).toBe(categoriesMock.length);
  });
  test(`Categories names correct`, async () => {
    expect(response.body.map(c => c.name)).toEqual(
      expect.arrayContaining(categoriesMock)
    );
  });
});
