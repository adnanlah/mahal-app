'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleInvoice_Product = sequelize.define('SaleInvoice_Product', {
    unity_price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    unity: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    cost: DataTypes.FLOAT,
    designation:  {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  SaleInvoice_Product.associate = function(models) {
    // associations can be defined here
  };
  return SaleInvoice_Product;
};