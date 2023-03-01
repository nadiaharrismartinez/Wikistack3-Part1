const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const { notFoundPage, errorPage } = require('./views');

app.use(morgan('dev')); //logging middleware
// app.use(require('method-override')('_method'));
app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false })); //parsing middleware for form input data
app.use(express.json());

app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

app.get('/', (req, res, next) => {
  res.redirect('/wiki');
});

// NO '/' BECAUSE IT IS A CATCH ALL. IE: localhost:3000/potato
app.use((req, res, next) => {
  res.status(404).send(notFoundPage());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(errorPage(err));
});

module.exports = app;
