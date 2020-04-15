'use strict';
module.exports = (sequelize, DataTypes) => {
  const Depense = sequelize.define('Depense', {
    amount: DataTypes.FLOAT,
    amount_text: DataTypes.STRING,
    designation: DataTypes.STRING,
    account: DataTypes.STRING,
    account_info: DataTypes.STRING,
    date: DataTypes.DATE,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  Depense.associate = function(models) {
    // associations can be defined here
  };
  return Depense;
};