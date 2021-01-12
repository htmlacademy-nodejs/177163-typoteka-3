'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const DataService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);

const {HttpCode} = require(`../../constants`);

const mockData = [
  {
    "id": `qpdB5W`,
    "category": [
      `Разное`,
      `Без рамки`
    ],
    "title": `Рок — это протест`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "createdAt": `2020-11-22 06:05:39`,
    "comments": [
      {
        "id": `dFsn2r`,
        "text": `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "id": `TGeudj`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `HUY9zp`,
        "text": `Планируете записать видосик на эту тему?`
      }
    ]
  },
  {
    "id": `URLG4A`,
    "category": [
      `Без рамки`,
      `Музыка`
    ],
    "title": `Обзор новейшего смартфона`,
    "announce": `Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "createdAt": `2020-10-27 00:39:43`,
    "comments": [
      {
        "id": `Ul1vVV`,
        "text": `Это где ж такие красоты?`
      },
      {
        "id": `tdMdNd`,
        "text": `Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `PkRvK7`,
    "category": [
      `Музыка`,
      `Кино`,
      `Без рамки`,
      `Железо`
    ],
    "title": `Борьба с прокрастинацией`,
    "announce": `Ёлки — это не просто красивое дерево. Это прочная древесина. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов.`,
    "createdAt": `2020-12-20 12:04:11`,
    "comments": [
      {
        "id": `ispIWD`,
        "text": `Хочу такую же футболку :-)`
      }
    ]
  },
  {
    "id": `rCRheV`,
    "category": [
      `Разное`,
      `Музыка`,
      `IT`
    ],
    "title": `Лучшие рок-музыканты 20-века`,
    "announce": `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Первая большая ёлка была установлена только в 1938 году.`,
    "fullText": `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
    "createdAt": `2020-09-25 19:54:52`,
    "comments": [
      {
        "id": `YA-RJA`,
        "text": `Плюсую, но слишком много буквы! Совсем немного... Это где ж такие красоты?`
      },
      {
        "id": `djSB1P`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Согласен с автором! Мне кажется или я уже читал это где-то?`
      },
      {
        "id": `mwlW2F`,
        "text": `Совсем немного...`
      },
      {
        "id": `hD4vt5`,
        "text": `Планируете записать видосик на эту тему? Совсем немного...`
      }
    ]
  },
  {
    "id": `WQ89tr`,
    "category": [
      `Железо`,
      `Разное`,
      `Кино`
    ],
    "title": `Лучшие рок-музыканты 20-века`,
    "announce": `Это один из лучших рок-музыкантов. Он написал больше 30 хитов. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
    "createdAt": `2020-10-26 14:50:07`,
    "comments": [
      {
        "id": `b2kvCP`,
        "text": `Совсем немного... Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `k3SzUO`,
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      },
      {
        "id": `QmUDN1`,
        "text": `Это где ж такие красоты? Мне кажется или я уже читал это где-то? Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  article(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all articles`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
            .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of 5 articles`, () => expect(response.body.length).toBe(5));
  test(`First article's id is "qpdB5W"`, () => expect(response.body[0].id).toBe(`qpdB5W`));
});

describe(`API returns an article with given id`, () => {
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
            .get(`/articles/qpdB5W`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "Рок — это протест"`, () => expect(response.body.title).toBe(`Рок — это протест`));
});

describe(`API creates an article if data is valid`, () => {

  const app = createAPI();
  let response;

  const newArticle = {
    category: [
      `Test Create 1`,
      `Test Create 2`
    ],
    title: `Test Create`,
    announce: `Test Create`,
    fullText: `Test Create`
  };

  beforeAll(async () => {
    response = await request(app)
            .post(`/articles`)
            .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Articles count is changed`, () => request(app)
        .get(`/articles`)
        .expect((res) => expect(res.body.length).toBe(6))
  );

});

describe(`API refuses to create an article if data is invalid`, () => {
  const app = createAPI();

  const newArticle = {
    category: [
      `Test Create 1`,
      `Test Create 2`
    ],
    title: `Test Create`,
    announce: `Test Create`,
    fullText: `Test Create`
  };

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newArticle)) {
      const badArticle = {...newArticle};
      delete badArticle[key];
      await request(app)
                .post(`/articles`)
                .send(badArticle)
                .expect(HttpCode.BAD_REQUEST);
    }
  });
});

describe(`API changes existent article`, () => {

  const app = createAPI();
  let response;

  const newArticle = {
    category: [
      `Test Edit 1`,
      `Test Edit 2`
    ],
    title: `Test Edit`,
    announce: `Test Edit`,
    fullText: `Test Edit`
  };

  beforeAll(async () => {
    response = await request(app)
            .put(`/articles/qpdB5W`)
            .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining(newArticle)));
  test(`Offer is really changed`, () => request(app)
        .get(`/articles/qpdB5W`)
        .expect((res) => expect(res.body.title).toBe(`Test Edit`))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {

  const app = createAPI();

  const validArticle = {
    category: [
      `Test Edit 1`,
      `Test Edit 2`
    ],
    title: `Test Edit`,
    announce: `Test Edit`,
    fullText: `Test Edit`
  };
  return request(app)
        .put(`/articles/NOEXIST`)
        .send(validArticle)
        .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {

  const app = createAPI();

  const invalidArticle = {
    category: [
      `Test Edit 1`,
      `Test Edit 2`
    ],
    title: `Test Edit`,
    fullText: `Test Edit`
  };

  return request(app)
        .put(`/articles/qpdB5W`)
        .send(invalidArticle)
        .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
            .delete(`/articles/qpdB5W`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body.id).toBe(`qpdB5W`));
});

test(`API refuses to delete non-existent article`, () => {

  const app = createAPI();

  return request(app)
        .delete(`/articles/NOEXST`)
        .expect(HttpCode.NOT_FOUND);
});

describe(`API returns a list of comments to given article`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
            .get(`/articles/rCRheV/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of 4 comments`, () => expect(response.body.length).toBe(4));

  test(`First comment's id is "YA-RJA"`, () => expect(response.body[0].id).toBe(`YA-RJA`));

});


describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
            .post(`/articles/rCRheV/comments`)
            .send(newComment);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));


  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));

  test(`Comments count is changed`, () => request(app)
        .get(`/articles/rCRheV/comments`)
        .expect((res) => expect(res.body.length).toBe(5))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
        .post(`/articles/NOEXST/comments`)
        .send({
          text: `Неважно`
        })
        .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {

  const app = createAPI();

  return request(app)
        .post(`/articles/rCRheV/comments`)
        .send({})
        .expect(HttpCode.BAD_REQUEST);

});

describe(`API correctly deletes a comment`, () => {

  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
            .delete(`/articles/WQ89tr/comments/b2kvCP`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns comment deleted`, () => expect(response.body.id).toBe(`b2kvCP`));
  test(`Comments count is 3 now`, () => request(app)
        .get(`/articles/WQ89tr/comments`)
        .expect((res) => expect(res.body.length).toBe(2))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {

  const app = createAPI();

  return request(app)
        .post(`/articles/NOEXST/comments`)
        .send({
          text: `Неважно`
        })
        .expect(HttpCode.NOT_FOUND);

});

test(`API refuses to delete non-existent comment`, () => {
  const app = createAPI();

  return request(app)
        .delete(`/articles/WQ89tr/comments/NOEXST`)
        .expect(HttpCode.NOT_FOUND);

});
