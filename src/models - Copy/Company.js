'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
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
    logo: DataTypes.STRING,
  }, {});

  return Company;
};