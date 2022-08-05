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
  })
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Show.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Show.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
