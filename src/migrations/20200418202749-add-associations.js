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
        'Products',
        'ImageId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Images',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Companies',
        'ImageId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Images',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Products',
        'ProductCategoryId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'ProductCategories',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Proformats',
        'ClientId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'PurchaseInvoices',
        'SupplierId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'PurchaseOrders',
        'SupplierId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'SaleInvoices',
        'ClientId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'SaleOrders',
        'ClientId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Accounts',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Payments', // name of Source model
      'SaleInvoiceId', // name of the key we're adding 
    )
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'Products',
        'ProductCategoryId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'Products',
        'ImageId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'Companies',
        'ImageId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'Proformats',
        'ClientId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'PurchaseInvoices',
        'SupplierId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'PurchaseOrders',
        'SupplierId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'SaleInvoices',
        'ClientId',
      );
    })
    .then(() => {
      // remove Payment hasOne Order
      return queryInterface.removeColumn(
        'SaleOrders',
        'ClientId',
      );
    })
  }
};
