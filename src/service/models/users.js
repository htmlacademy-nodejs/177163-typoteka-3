`use strict`;

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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: `User`,
  tableName: `users`,
});
