'use strict';

class CategoryService {
  constructor(sequelize) {
    this._Category = sequelize.models.Category;
  }

  async findAll() {
    const res = await this._Category.findAll({raw: true});
    return res;
  }
}

module.exports = CategoryService;
