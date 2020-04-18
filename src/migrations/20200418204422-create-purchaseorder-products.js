'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseOrder_Products', {
      PurchaseOrderId: Sequelize.INTEGER,
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
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PurchaseOrder_Products');
  }
};
