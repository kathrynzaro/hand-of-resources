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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Destination.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
