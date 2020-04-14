'use strict';
module.exports = (sequelize, DataTypes) => {
  const PurchaseInvoice = sequelize.define('PurchaseInvoice', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.STRING(100),
    date: DataTypes.STRING(100),
    draft: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    payment_method: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
    timbres:  {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    remise_percentage: DataTypes.FLOAT,
    remise_amount:  {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    ntp: DataTypes.FLOAT,
    ntp_text: DataTypes.STRING
  }, {
    scopes: {
      draft: {
        where: {
          draft: true
        }
      },
    }
  });
  PurchaseInvoice.associate = function(models) {
    PurchaseInvoice.belongsToMany(models.Product, {through: 'PurchaseInvoice_Product', as: 'Items'})
    PurchaseInvoice.belongsTo(models.Account, {as: 'Supplier'});
  };
  return PurchaseInvoice;
};