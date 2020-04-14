'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proformat_Product = sequelize.define('Proformat_Product', {
    unity_price: DataTypes.FLOAT,
    product_quantity: DataTypes.INTEGER,
    product_unity: DataTypes.FLOAT,
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
  return Proformat_Product;
};