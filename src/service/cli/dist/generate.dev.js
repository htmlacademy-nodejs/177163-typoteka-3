'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var fs = require("fs").promises;

var chalk = require("chalk");

var _require = require("nanoid"),
    nanoid = _require.nanoid;

var _require2 = require("../../utils"),
    getRandomInt = _require2.getRandomInt,
    getRandomItems = _require2.getRandomItems,
    shuffle = _require2.shuffle;

var _require3 = require("./constants"),
    CountRequirements = _require3.CountRequirements,
    MONTH_INTERVAL = _require3.MONTH_INTERVAL,
    FILE_NAME = _require3.FILE_NAME,
    FILE_CATEGORIES_PATH = _require3.FILE_CATEGORIES_PATH,
    FILE_SENTENCES_PATH = _require3.FILE_SENTENCES_PATH,
    FILE_TITLES_PATH = _require3.FILE_TITLES_PATH,
    FILE_COMMENTS_PATH = _require3.FILE_COMMENTS_PATH,
    MAX_ID_LENGTH = _require3.MAX_ID_LENGTH,
    MAX_COMMENTS = _require3.MAX_COMMENTS;

var readContent = function readContent(filePath) {
  var content;
  return regeneratorRuntime.async(function readContent$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fs.readFile(filePath, "utf8"));

        case 3:
          content = _context.sent;
          return _context.abrupt("return", content.trim().split("\n"));

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error(chalk.red(_context.t0));
          return _context.abrupt("return", []);

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

var getTwoDigitsStr = function getTwoDigitsStr(num) {
  return num > 9 ? num : "0".concat(num);
};

var getRandomDate = function getRandomDate() {
  var now = new Date();
  var then = new Date(now).setMonth(now.getMonth() - MONTH_INTERVAL);
  var randomDate = new Date(getRandomInt(then, Date.parse(now)));
  var _ref = [randomDate.getFullYear(), getTwoDigitsStr(randomDate.getMonth() + 1), getTwoDigitsStr(randomDate.getDate()), getTwoDigitsStr(randomDate.getHours()), getTwoDigitsStr(randomDate.getMinutes()), getTwoDigitsStr(randomDate.getSeconds())],
      year = _ref[0],
      month = _ref[1],
      date = _ref[2],
      hours = _ref[3],
      minutes = _ref[4],
      seconds = _ref[5];
  return "".concat(year, "-").concat(month, "-").concat(date, " ").concat(hours, ":").concat(minutes, ":").concat(seconds);
};

var generateComments = function generateComments(count, comments) {
  return Array(count).fill({}).map(function () {
    return {
      id: nanoid(MAX_ID_LENGTH),
      text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(" ")
    };
  });
};

var generateOffers = function generateOffers(count, titles, sentences, categories, comments) {
  return Array(count).fill({}).map(function () {
    return {
      id: nanoid(MAX_ID_LENGTH),
      category: getRandomItems(categories, getRandomInt(1, categories.length - 1)),
      title: titles[getRandomInt(0, titles.length - 1)],
      announce: getRandomItems(sentences, getRandomInt(1, 5)).join(" "),
      fullText: getRandomItems(sentences, getRandomInt(1, 5)).join(" "),
      createdDate: getRandomDate(),
      comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
    };
  });
};

module.exports = {
  name: "--generate",
  run: function run(args) {
    var _ref2, _ref3, sentences, categories, titles, comments, _args2, count, countOffer, content;

    return regeneratorRuntime.async(function run$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return regeneratorRuntime.awrap(Promise.all([readContent(FILE_SENTENCES_PATH), readContent(FILE_CATEGORIES_PATH), readContent(FILE_TITLES_PATH), readContent(FILE_COMMENTS_PATH)]));

          case 3:
            _ref2 = _context2.sent;
            _ref3 = _slicedToArray(_ref2, 4);
            sentences = _ref3[0];
            categories = _ref3[1];
            titles = _ref3[2];
            comments = _ref3[3];
            _args2 = _slicedToArray(args, 1), count = _args2[0];
            countOffer = Number.parseInt(count, 10) || CountRequirements.DEFAULT;

            if (!(countOffer > CountRequirements.MAX)) {
              _context2.next = 14;
              break;
            }

            console.log(CountRequirements.MAX_MESSAGE);
            return _context2.abrupt("return");

          case 14:
            content = JSON.stringify(generateOffers(countOffer, titles, sentences, categories, comments), null, 4);
            _context2.next = 17;
            return regeneratorRuntime.awrap(fs.writeFile(FILE_NAME, content));

          case 17:
            console.info(chalk.green("Operation success. File created."));
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](0);
            console.error(chalk.red("Can't write data to file..."), _context2.t0);

          case 23:
          case "end":
            return _context2.stop();
        }
      }
    }, null, null, [[0, 20]]);
  }
};