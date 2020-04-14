'use strict';
module.exports = (sequelize, DataTypes) => {
  const CounterSale = sequelize.define('CounterSale', {
    client: DataTypes.STRING,
    ttc: DataTypes.FLOAT,
    ntp: DataTypes.FLOAT,
    date: DataTypes.STRING,
    remise_percentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    remise_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
  }, {});
  CounterSale.associate = function(models) {
    // associations can be defined here
    CounterSale.belongsToMany(models.Product, {through: 'CounterSale_Product', as: 'Items'})
  };
  return CounterSale;
};