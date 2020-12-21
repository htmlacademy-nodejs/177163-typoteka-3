'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../../constants`);
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILE_NAME);
    data = JSON.parse(fileContent);
    return Promise.resolve(data);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

module.exports = getMockData;
