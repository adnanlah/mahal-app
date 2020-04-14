'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleInvoice_Product = sequelize.define('SaleInvoice_Product', {
    unity_price: DataTypes.FLOAT,
    product_quantity: DataTypes.INTEGER,
    product_unity: DataTypes.STRING,
    product_amount: DataTypes.FLOAT,
    counts: DataTypes.BOOLEAN,
    cost: DataTypes.FLOAT,
    designation:  {
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, {});
  return SaleInvoice_Product;
};