'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleOrder_Product = sequelize.define('SaleOrder_Product', {
    unity_price: DataTypes.FLOAT,
    product_quantity: DataTypes.INTEGER,
    product_unity: DataTypes.STRING,
    product_amount: DataTypes.FLOAT,
    counts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    designation:  {
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, {});
  return SaleOrder_Product;
};