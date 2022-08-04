const { Router } = require('express');
const { Destination } = require('../models/Destination');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Destination.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
