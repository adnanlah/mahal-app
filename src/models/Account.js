'use strict';
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define('Account', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    phone: DataTypes.STRING,
    mobile: DataTypes.STRING,
    fax: DataTypes.STRING,
    email: DataTypes.STRING,
    rc: DataTypes.STRING,
    nif: DataTypes.STRING,
    ai: DataTypes.STRING,
    nis: DataTypes.STRING,
    cap: DataTypes.STRING,
    bank_account: DataTypes.STRING,
    type: DataTypes.STRING,
  }, {});
  account.associate = function(models) {
    // associations can be defined here
  };
  return account;
};