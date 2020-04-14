'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    date: DataTypes.STRING,
  }, {});
  Payment.associate = function(models) {
    Payment.belongsTo(models.SaleInvoice);
  };
  return Payment;
};