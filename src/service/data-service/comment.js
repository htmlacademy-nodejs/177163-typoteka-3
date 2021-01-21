'use strict';

class CommentService {
  constructor(db) {
    this._comments = db.models.Comment;
  }

  findAll(articleId) {
    return this._comments.findAll({
      where: {articleId},
      raw: true,
    });
  }

  create(articleId, comment) {
    return this._comments.create({
      articleId,
      ...comment
    });
  }

  async drop(commentId) {
    const deleted = await this._comments.destroy({
      where: {id: commentId}
    });

    return !!deleted && commentId;
  }
}

module.exports = CommentService;
