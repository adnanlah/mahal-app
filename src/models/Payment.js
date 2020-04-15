'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    number: DataTypes.INTEGER,
    amount: DataTypes.FLOAT,
    date: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  Payment.associate = function(models) {
    Payment.belongsTo(models.SaleInvoice);
    // associations can be defined here
  };
  return Payment;
};