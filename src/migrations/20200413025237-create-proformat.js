'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Proformats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      pretax_amount: {
        type: Sequelize.FLOAT
      },
      tva_percentage: {
        type: Sequelize.FLOAT
      },
      tva: {
        type: Sequelize.FLOAT
      },
      ttc: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Proformats');
  }
};