'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleOrder_Product = sequelize.define('SaleOrder_Product', {
    unity_price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    unity: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  SaleOrder_Product.associate = function(models) {
    // associations can be defined here
  };
  return SaleOrder_Product;
};