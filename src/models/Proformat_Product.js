'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proformat_Product = sequelize.define('Proformat_Product', {
    unity_price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    unity: DataTypes.FLOAT,
    amount: DataTypes.FLOAT,
    designation:  {
      type: DataTypes.STRING,
      defaultValue: ''
    },
  }, {});
  Proformat_Product.associate = function(models) {
    // associations can be defined here
  };
  return Proformat_Product;
};