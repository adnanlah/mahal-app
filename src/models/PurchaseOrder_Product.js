'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder_Product = sequelize.define('PurchaseOrder_Product', {
    unity_price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    unity: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    designation:  {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  PurchaseOrder_Product.associate = function(models) {
    // associations can be defined here
  };
  return PurchaseOrder_Product;
};