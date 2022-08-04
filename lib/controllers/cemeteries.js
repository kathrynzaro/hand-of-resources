const { Router } = require('express');
const { Cemetery } = require('../models/Cemetery');

module.exports = Router()
  .get('/', async (req, res, next) => {
    try {
      const data = await Cemetery.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Cemetery.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
