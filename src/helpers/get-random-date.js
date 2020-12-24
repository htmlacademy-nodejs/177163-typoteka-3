'use strict';

const {
  getRandomInt,
} = require(`../utils`);

const getRandomDate = (interval) => {
  let now = new Date();
  let then = (new Date(now)).setMonth(now.getMonth() - interval);
  const randomDate = new Date(getRandomInt(then, Date.parse(now))).toJSON();
  return randomDate;
};

module.exports = getRandomDate;
