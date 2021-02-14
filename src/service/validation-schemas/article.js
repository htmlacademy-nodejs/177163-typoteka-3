'use strict';

const Joi = require(`joi`);

module.exports = Joi.object({
  title: Joi.string()
        .min(30)
        .max(250)
        .required(),
  announce: Joi.string()
        .min(30)
        .max(250)
        .required(),
  fullText: Joi.string()
        .max(1000)
        .required(),
  category: Joi.array()
        .items(Joi.number())
        .min(1)
        .required(),
  picture: Joi.string()
        .pattern(/([a-zA-Z0-9\s_\\.\-\(\):])+(.png|.jpg)$/i),
});
