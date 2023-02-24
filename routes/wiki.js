const express = require('express');
const router = express.Router();
const { Page } = require('../models');
const { addPage } = require('../views');

router.get('/', (req, res, next) => {
  res.send('got to GET /wiki/');
});

router.post('/', async (req, res, next) => {
  try {
    const page = await Page.create(req.body);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
