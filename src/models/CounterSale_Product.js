'use strict';
module.exports = (sequelize, DataTypes) => {
  const CounterSale_Product = sequelize.define('CounterSale_Product', {
    unity_price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    unity: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    cost: DataTypes.FLOAT
  }, {});
  CounterSale_Product.associate = function(models) {
    CounterSale_Product.belongsTo(models.Product);
    CounterSale_Product.belongsTo(models.CounterSale);
  };
  return CounterSale_Product;
};