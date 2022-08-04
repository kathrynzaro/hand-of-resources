const { Router } = require('express');
const { Sign } = require('../models/Sign');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Sign.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
