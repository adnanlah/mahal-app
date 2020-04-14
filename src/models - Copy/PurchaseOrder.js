'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseOrder = sequelize.define('PurchaseOrder', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
  }, {});
  PurchaseOrder.associate = function(models) {
    PurchaseOrder.belongsToMany(models.Product, {through: 'PurchaseOrder_Product', as: 'Items'})
    PurchaseOrder.belongsTo(models.Account, {as: 'Supplier'});
  };
  return PurchaseOrder;
};