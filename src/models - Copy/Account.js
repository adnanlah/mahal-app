'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
  
  return Account;
};