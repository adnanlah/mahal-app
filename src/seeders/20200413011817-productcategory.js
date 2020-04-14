'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductCategories', [{
        name: 'Pieces de recharge',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        name: 'Autres',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductCategories', null, {});
  }
};
