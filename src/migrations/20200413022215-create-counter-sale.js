'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CounterSales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      client: {
        type: Sequelize.STRING
      },
      ttc: {
        type: Sequelize.FLOAT
      },
      ntp: {
        type: Sequelize.FLOAT
      },
      date: {
        type: Sequelize.STRING
      },
      remise_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_amount: {
        type: Sequelize.FLOAT,
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
    return queryInterface.dropTable('CounterSales');
  }
};