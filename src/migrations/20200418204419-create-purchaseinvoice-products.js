'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseInvoice_Products', {
      PurchaseInvoiceId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
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
    return queryInterface.dropTable('PurchaseInvoice_Products');
  }
};
