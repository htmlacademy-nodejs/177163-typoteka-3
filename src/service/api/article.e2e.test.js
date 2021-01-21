'use strict';

const express = require(`express`);
const request = require(`supertest`);

const article = require(`./article`);
const ArticleService = require(`../data-service/article`);
const CommentService = require(`../data-service/comment`);
const Alias = require(`../models/aliases`);
const testDb = require(`../lib/testdb`);

const {HttpCode} = require(`../../constants`);

const articlesMock = [
  {
    "title": `Рок — это протест`,
    "announce": `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле? Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "fullText": `Из под его пера вышло 8 платиновых альбомов. Первая большая ёлка была установлена только в 1938 году. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
    "comments": [
      {
        "text": `Планируете записать видосик на эту тему?`
      },
      {
        "text": `Совсем немного... Давно не пользуюсь стационарными компьютерами. Ноутбуки победили. Это где ж такие красоты?`
      },
      {
        "text": `Давно не пользуюсь стационарными компьютерами. Ноутбуки победили.`
      }
    ]
  },
  {
    "title": `Обзор новейшего смартфона`,
    "announce": `Достичь успеха помогут ежедневные повторения. Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике. Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры. Как начать действовать? Для начала просто соберитесь. Простые ежедневные упражнения помогут достичь успеха.`,
    "fullText": `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать. Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
    "comments": [
      {
        "text": `Это где ж такие красоты?`
      },
      {
        "text": `Согласен с автором! Мне не нравится ваш стиль. Ощущение, что вы меня поучаете. Хочу такую же футболку :-)`
      }
    ]
  },
];

let categoryId;
let testArticles = [];

beforeAll(async () => {
  const category = await testDb.models.Category.create({name: `test category`});
  categoryId = category.id;
  articlesMock.forEach(async (a) => {
    let createdArticle = await testDb.models.Article.create(a, {include: [Alias.COMMENTS]});
    testArticles.push({
      id: createdArticle.id,
      title: createdArticle.title,
    });
    createdArticle.addCategories([categoryId]);
  });
});

afterAll(async () => {
  await testDb.models.Comment.destroy({
    where: {},
    truncate: {cascade: true},
  });
  await testDb.models.Article.destroy({
    where: {},
    truncate: {cascade: true},
  });
  await testDb.models.Category.destroy({
    where: {},
    truncate: {cascade: true},
  });
});

const app = express();
app.use(express.json());
article(app, new ArticleService(testDb), new CommentService(testDb));

describe(`API returns a list of all articles`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app)
            .get(`/articles`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns a list of ${articlesMock.length} articles`, () => expect(response.body.articles.length).toBe(articlesMock.length));
  test(`First article's title is "${articlesMock[0].title}"`, () => expect(response.body.articles[0].title).toBe(articlesMock[0].title));
});

describe(`API returns an article with given id`, () => {
  let response;
  let currId; let currTitle;

  beforeAll(async () => {
    currId = testArticles[0].id;
    currTitle = testArticles[0].title;
    response = await request(app)
            .get(`/articles/${currId}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Article's title is "${currTitle}"`, () => expect(response.body.title).toBe(`${currTitle}`));
});

describe(`API creates an article if data is valid`, () => {
  let response;
  let newArticle;

  beforeAll(async () => {
    newArticle = {
      category: [categoryId],
      title: `Test Create Title 30 symbols long at least`,
      announce: `Test Create Announcement 30 symbols long at least`,
      fullText: `Test Create`
    };
    response = await request(app)
            .post(`/articles`)
            .send(newArticle);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns article created`, () => expect(response.body).toEqual(expect.objectContaining({
    title: newArticle.title,
    announce: newArticle.announce,
    fullText: newArticle.fullText,
  })));
  test(`Articles count is changed`, () => request(app)
        .get(`/articles`)
        .expect((res) => {
          expect(res.body.articlesCount).toBe(articlesMock.length + 1);
        })
  );

});

describe(`API refuses to create an article if data is invalid`, () => {
  test(`Without any required property response code is 400`, async () => {
    const newArticle = {
      category: [categoryId],
      title: `Test Create Title 30 symbols long at least`,
      announce: `Test Create Announcement 30 symbols long at least`,
      fullText: `Test Create`
    };
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

  let response;
  let newArticle;

  beforeAll(async () => {
    newArticle = {
      category: [categoryId],
      title: `Test Edit Article Title With At Least 30 Symbols`,
      announce: `Test Edit Announcement 30 symbols long at least`,
      fullText: `Test Edit`
    };
    response = await request(app)
            .put(`/articles/${testArticles[0].id}`)
            .send(newArticle);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns changed article`, () => expect(response.body).toEqual(expect.objectContaining({
    title: newArticle.title,
    announce: newArticle.announce,
    fullText: newArticle.fullText,
  })));
  test(`Article is really changed`, () => request(app)
        .get(`/articles/${testArticles[0].id}`)
        .expect((res) => expect(res.body.title).toBe(newArticle.title))
  );
});

test(`API returns status code 404 when trying to change non-existent article`, () => {
  return request(app)
        .put(`/articles/0`)
        .send({
          category: [categoryId],
          title: `Test Edit Article Title With At Least 30 Symbols`,
          announce: `Test Edit Announcement 30 symbols long at least`,
          fullText: `Test Edit`
        })
        .expect(HttpCode.NOT_FOUND);
});

test(`API returns status code 400 when trying to change an article with invalid data`, () => {
  return request(app)
        .put(`/articles/${testArticles[1].id}`)
        .send({
          category: [categoryId],
          title: `Test Edit Article Title With At Least 30 Symbols`,
          fullText: `Test Edit`,
        })
        .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes an article`, () => {

  let response;
  let id;

  beforeAll(async () => {
    id = testArticles[1].id;
    response = await request(app)
            .delete(`/articles/${id}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns deleted article`, () => expect(response.body).toBe(`${id}`));
});

test(`API refuses to delete non-existent article`, () => {
  return request(app)
        .delete(`/articles/0`)
        .expect(HttpCode.BAD_REQUEST);
});

describe(`API returns a list of comments to given article`, () => {

  let response;
  let id;

  beforeAll(async () => {
    id = testArticles[0].id;
    response = await request(app)
            .get(`/articles/${id}/comments`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));

  test(`Returns list of ${articlesMock[0].comments.length} comments`, () => expect(response.body.length).toBe(articlesMock[0].comments.length));

  test(`First comment's text is "${articlesMock[0].comments[0].text}"`, () => expect(response.body[0].text).toBe(articlesMock[0].comments[0].text));

});

describe(`API creates a comment if data is valid`, () => {

  const newComment = {
    text: `Валидному комментарию достаточно этого поля`
  };
  let response;
  let id;

  beforeAll(async () => {
    id = testArticles[0].id;
    response = await request(app)
            .post(`/articles/${id}/comments`)
            .send(newComment);
  });

  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCode.CREATED));
  test(`Returns comment created`, () => expect(response.body).toEqual(expect.objectContaining(newComment)));
  test(`Comments count is changed`, () => request(app)
        .get(`/articles/${id}/comments`)
        .expect((res) => expect(res.body.length).toBe(articlesMock[0].comments.length + 1))
  );

});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  return request(app)
        .post(`/articles/NOEXST/comments`)
        .send({
          text: `Неважно`
        })
        .expect(HttpCode.BAD_REQUEST);
});

test(`API refuses to create a comment when data is invalid, and returns status code 400`, () => {
  return request(app)
        .post(`/articles/${testArticles[0].id}/comments`)
        .send({})
        .expect(HttpCode.BAD_REQUEST);
});

describe(`API correctly deletes a comment`, () => {

  let response;
  let commentId;
  let commentsCountPrev;
  let articleId;

  beforeAll(async () => {
    articleId = testArticles[0].id;
    const articleComments = await request(app)
      .get(`/articles/${articleId}/comments`);
    commentId = articleComments.body[0].id;
    commentsCountPrev = articleComments.body.length;
    response = await request(app)
            .delete(`/articles/${articleId}/comments/${commentId}`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCode.OK));
  test(`Returns comment deleted`, () => expect(response.body).toBe(`${commentId}`));
  test(`Comments count is ${commentsCountPrev - 1} now`, () => request(app)
        .get(`/articles/${articleId}/comments`)
        .expect((res) => expect(res.body.length).toBe(commentsCountPrev - 1))
  );
});

test(`API refuses to create a comment to non-existent article and returns status code 404`, () => {
  return request(app)
        .post(`/articles/0/comments`)
        .send({
          text: `Неважно`
        })
        .expect(HttpCode.BAD_REQUEST);

});

test(`API refuses to delete non-existent comment`, () => {
  return request(app)
        .delete(`/articles/${testArticles[0].id}/comments/0`)
        .expect(HttpCode.BAD_REQUEST);
});
