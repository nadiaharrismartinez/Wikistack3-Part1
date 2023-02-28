const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack2', {
  logging: false,
});

// Added code not in solution
db.authenticate().then(() => {
  console.log('connected to the database');
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

Page.beforeValidate((page) => {
  /*
   * Generate slug
   */
  if (!page.slug) {
    page.slug = page.title.replace(/\s/g, '_').replace(/\W/g, '').toLowerCase();
  }
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  email: {
    type: Sequelize.STRING,
    isEmail: true,
    allowNull: false,
  },
});

// Page.belongsTo(User, { as: 'author' });
Page.belongsTo(User);

module.exports = {
  db,
  Page,
  User,
};
