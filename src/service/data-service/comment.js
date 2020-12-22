'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {

  findAll(article) {
    return article.comments;
  }

  create(article, comment) {
    const newComment = {...comment, id: nanoid(MAX_ID_LENGTH)};
    article.comments.push(newComment);
    return newComment;
  }

  drop(article, commentId) {
    const dropComment = article.comments.find((it) => it.id === commentId);
    if (!dropComment) {
      return null;
    }
    article.comments = article.comments.filter((it) => it.id !== commentId);
    return dropComment;
  }
}

module.exports = CommentService;
