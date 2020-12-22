'use strict';

const {
  HttpCode
} = require(`../../constants`);

const articleKeys = [`category`, `title`, `announce`, `fullText`];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExist = articleKeys.every((key) => keys.includes(key));

  if (!keysExist) {
    return res.status(HttpCode.BAD_REQUEST)
      .json(`Bad request`);
  }

  return next();
};
