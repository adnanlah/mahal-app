'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      selling_price: {
        type: Sequelize.FLOAT
      },
      image_path: {
        type: Sequelize.STRING
      },
      sum_purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      average_purchase_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      number_purchase_prices: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    return queryInterface.dropTable('Products');
  }
};