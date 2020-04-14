'use strict';
module.exports = (sequelize, DataTypes) => {
  const Depense = sequelize.define('Depense', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.FLOAT,
    type: DataTypes.STRING,
    account: DataTypes.STRING,
    account_info: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});

  Depense.associate = function(models) {
    // Depense.belongsTo(models.DepenseUse);
  };
  return Depense;
};