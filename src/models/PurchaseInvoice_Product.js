'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseInvoice_Product = sequelize.define('PurchaseInvoice_Product', {
    unity_price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    unity: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  PurchaseInvoice_Product.associate = function(models) {
    // associations can be defined here
  };
  return PurchaseInvoice_Product;
};