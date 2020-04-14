'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleOrder = sequelize.define('SaleOrder', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.STRING(100),
    date: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
  }, {});
  SaleOrder.associate = function(models) {
    SaleOrder.belongsToMany(models.Product, {through: 'SaleOrder_Product'})
    SaleOrder.belongsTo(models.Account, {as: 'Client'});
  };
  return SaleOrder;
};