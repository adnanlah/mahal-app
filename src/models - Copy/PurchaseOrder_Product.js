'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder_Product = sequelize.define('PurchaseOrder_Product', {
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
  return PurchaseOrder_Product;
};