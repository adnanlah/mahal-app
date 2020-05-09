'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductCategories', [{
        name: 'Pieces de recharge',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }, {
        name: 'Autres',
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
