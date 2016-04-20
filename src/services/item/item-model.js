'use strict';

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const item = sequelize.define('items', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    file: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hash: {
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    freezeTableName: true
  });

  item.sync();

  return item;
};
