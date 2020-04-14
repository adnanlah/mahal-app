'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SaleInvoice_Products', {
      SaleInvoiceId: Sequelize.INTEGER,
      ProductId: Sequelize.INTEGER,
      unity_price: Sequelize.FLOAT,
      quantity: Sequelize.INTEGER,
      unity: Sequelize.STRING,
      amount: Sequelize.FLOAT,
      cost: Sequelize.FLOAT,
      designation:  {
        type: Sequelize.STRING,
        defaultValue: ''
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SaleInvoice_Products');
  }
};