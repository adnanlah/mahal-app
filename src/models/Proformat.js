'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proformat = sequelize.define('Proformat', {
    date: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
    remise_percentage: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    remise_amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
  }, {});
  Proformat.associate = function(models) {
    // Proformat.belongsToMany(models.Product, {through: 'Proformat_Product', as: 'Items'})
    // Proformat.belongsTo(models.Account, {as: 'Client', foreignKey: 'AccountId'});
  };
  return Proformat;
};