'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Category extends Model { }

module.exports = (sequelize) => Category.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: `Category`,
  tableName: `categories`,
});
