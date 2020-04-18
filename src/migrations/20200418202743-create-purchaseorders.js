'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseOrders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: Sequelize.STRING(100),
      pretax_amount: Sequelize.FLOAT,
      tva_percentage: Sequelize.FLOAT,
      tva: Sequelize.FLOAT,
      ttc: Sequelize.FLOAT,
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PurchaseOrders');
  }
};
