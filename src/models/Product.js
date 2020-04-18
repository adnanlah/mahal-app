'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    selling_price: DataTypes.FLOAT,
    sum_purchase_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    average_purchase_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    number_purchase_prices: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.PurchaseInvoice, {through: 'PurhcaseInvoice_Product'})
    Product.belongsToMany(models.PurchaseOrder, {through: 'PurchaseOrder_Product'})
    Product.belongsToMany(models.CounterSale, {through: 'CounterSale_Product'})
    Product.belongsToMany(models.SaleInvoice, {through: 'SaleInvoice_Product'})
    Product.belongsToMany(models.SaleOrder, {through: 'SaleOrder_Product'})
    Product.belongsToMany(models.Proformat, {through: 'Proformat_Product'})
    Product.belongsTo(models.ProductCategory);
    Product.belongsTo(models.Image);
  };
  return Product;
};