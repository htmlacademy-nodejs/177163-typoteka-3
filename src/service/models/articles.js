'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Article extends Model { }

module.exports = (sequelize) => Article.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  announce: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  fullText: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: `Article`,
  tableName: `articles`,
});
