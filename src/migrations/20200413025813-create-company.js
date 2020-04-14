'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
      description: Sequelize.STRING,
      address: Sequelize.STRING,
      city: Sequelize.STRING,
      phone: Sequelize.STRING,
      mobile: Sequelize.STRING,
      fax: Sequelize.STRING,
      email: Sequelize.STRING,
      rc: Sequelize.STRING,
      nif: Sequelize.STRING,
      ai: Sequelize.STRING,
      nis: Sequelize.STRING,
      cap: Sequelize.STRING,
      bank_account: Sequelize.STRING,
      logo: Sequelize.STRING,
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
    return queryInterface.dropTable('companies');
  }
};