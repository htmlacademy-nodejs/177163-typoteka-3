'use strict';

const Joi = require(`joi`);
const {HttpCode} = require(`../../constants`);

module.exports = (idParamName) => (
  async (req, res, next) => {
    const schema = Joi.number().greater(0);
    const id = req.params[idParamName];
    try {
      await schema.validateAsync(id, {abortEarly: false});
    } catch (err) {
      const {details} = err;
      res.status(HttpCode.BAD_REQUEST).json({
        message: details.map((errorDescription) => errorDescription.message),
        data: idParamName
      });
      return;
    }

    next();
  }
);
