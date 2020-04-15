'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    date: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  PurchaseOrder.associate = function(models) {
    PurchaseOrder.belongsToMany(models.Product, {through: 'PurchaseOrder_Product', as: 'Items'})
    PurchaseOrder.belongsTo(models.Account, {as: 'Supplier'});
  };
  return PurchaseOrder;
};