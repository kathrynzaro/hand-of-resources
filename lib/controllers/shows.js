const { Router } = require('express');
const { Show } = require('../models/Show');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Show.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
