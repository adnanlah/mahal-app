'use strict';
module.exports = (sequelize, DataTypes) => {
  const SaleInvoice = sequelize.define('SaleInvoice', {
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
    remise_amount:  {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    ntp: DataTypes.FLOAT,
    ntp_text: DataTypes.STRING,
    amount_paid: DataTypes.FLOAT,
    fully_paid: DataTypes.BOOLEAN,
    debt_last_date: DataTypes.DATE,
    debt_alarm_date: DataTypes.DATE,
    debt_note: DataTypes.STRING,
    debt_seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    scopes: {
      paid: {
        where: {
          fully_paid: true
        }
      },
      unpaid: {
        where: {
          fully_paid: false
        }
      },
      unpaid_unseen: {
        where: {
          fully_paid: false,
          debt_seen: false
        }
      },
    }
  });
  SaleInvoice.associate = function(models) {
    SaleInvoice.belongsToMany(models.Product, {through: 'SaleInvoice_Product', as: 'Items'})
    SaleInvoice.belongsTo(models.Account, {as: 'Client'});
    SaleInvoice.hasMany(models.Payment);
  };
  return SaleInvoice;
};