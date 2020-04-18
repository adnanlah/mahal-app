'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: Sequelize.FLOAT,
      amount_text: Sequelize.STRING,
      motive: Sequelize.STRING,
      account_name: Sequelize.STRING,
      account_info: Sequelize.STRING,
      date: Sequelize.STRING,
      type: Sequelize.STRING,
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
    return queryInterface.dropTable('Transactions');
  }
};
