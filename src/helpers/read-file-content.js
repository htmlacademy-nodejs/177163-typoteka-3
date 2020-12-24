'use strict';

const fs = require(`fs`).promises;

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    return content.trim().split(`\n`);
  } catch (err) {
    return [];
  }
};

module.exports = readContent;
