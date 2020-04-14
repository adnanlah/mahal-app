'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PurchaseInvoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      number: Sequelize.STRING(100),
      date: Sequelize.STRING(100),
      payment_method: Sequelize.STRING(100),
      pretax_amount: Sequelize.FLOAT,
      tva_percentage: Sequelize.FLOAT,
      tva: Sequelize.FLOAT,
      ttc: Sequelize.FLOAT,
      timbres:  {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_percentage: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      remise_amount:  {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      ntp: Sequelize.FLOAT,
      ntp_text: Sequelize.STRING,
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
    return queryInterface.dropTable('PurchaseInvoices');
  }
};