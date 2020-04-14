'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseInvoice_Product = sequelize.define('PurchaseInvoice_Product', {
    unity_price: DataTypes.FLOAT,
    product_quantity: DataTypes.INTEGER,
    product_unity: DataTypes.STRING,
    product_amount: DataTypes.FLOAT,
    counts: DataTypes.BOOLEAN,
    designation:  {
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, {});
  return PurchaseInvoice_Product;
};