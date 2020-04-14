'use strict';
module.exports = (sequelize, DataTypes) => {
  const CounterSale_Product = sequelize.define('CounterSale_Product', {
    unity_price: DataTypes.FLOAT,
    product_quantity: DataTypes.INTEGER,
    product_unity: DataTypes.STRING,
    product_amount: DataTypes.FLOAT,
    counts: DataTypes.BOOLEAN,
    cost: DataTypes.FLOAT,   
  }, {});
  CounterSale_Product.associate = function(models) {
    CounterSale_Product.belongsTo(models.Product);
    CounterSale_Product.belongsTo(models.CounterSale);
  };
  return CounterSale_Product;
};