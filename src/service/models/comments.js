'use strict';

const {DataTypes, Model} = require(`sequelize`);

class Comment extends Model { }

module.exports = (sequelize) => Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  modelName: `Comment`,
  tableName: `comments`,
});
