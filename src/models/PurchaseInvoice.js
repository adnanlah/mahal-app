'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseInvoice = sequelize.define('PurchaseInvoice', {
    number: DataTypes.STRING(100),
    date: DataTypes.STRING(100),
    payment_method: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
    timbres:  {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    remise_percentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    remise_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    ntp: DataTypes.FLOAT,
    ntp_text: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  PurchaseInvoice.associate = function(models) {
    PurchaseInvoice.belongsToMany(models.Product, {through: 'PurchaseInvoice_Product', as: 'Items'})
    PurchaseInvoice.belongsTo(models.Account, {as: 'Supplier'});
  };
  return PurchaseInvoice;
};