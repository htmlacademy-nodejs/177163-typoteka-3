'use strict';

class CategoryService {
  constructor(db) {
    this._categories = db.models.Category;
  }

  async findAll() {
    const res = await this._categories.findAll({raw: true});
    return res;
  }
}

module.exports = CategoryService;
