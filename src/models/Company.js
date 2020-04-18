'use strict';
module.exports = (sequelize, DataTypes) => {
  const company = sequelize.define('Company', {
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
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  company.associate = function(models) {
    // associations can be defined here
  };
  return company;
};