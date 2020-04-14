'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Payments', // name of Source model
      'SaleInvoiceId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'SaleInvoices', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      return queryInterface.addColumn(
        'Products', // name of Source model
        'ProductCategoryId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'ProductCategories', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Proformats', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'PurchaseInvoices', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'PurchaseOrders', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'SaleInvoices', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'SaleOrders', // name of Source model
        'AccountId', // name of the key we're adding 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts', // name of Target model
            key: 'id', // key in Target model that we're referencing
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Orders', // name of Source model
      'CustomerId' // key we want to remove
    );
  }
};
