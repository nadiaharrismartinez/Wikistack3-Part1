const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const { userList, userPages, notFoundPage } = require('../views');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const pages = await Page.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    if (!user) {
      res.status(404).send(notFoundPage());
    } else {
      res.send(userPages(user, pages));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
