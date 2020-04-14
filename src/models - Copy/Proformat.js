'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proformat = sequelize.define('Proformat', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    date: DataTypes.STRING(100),
    pretax_amount: DataTypes.FLOAT,
    tva_percentage: DataTypes.FLOAT,
    tva: DataTypes.FLOAT,
    ttc: DataTypes.FLOAT,
    remise: DataTypes.FLOAT,
  }, {});
  Proformat.associate = function(models) {
    // associations can be defined here
    Proformat.belongsToMany(models.Product, {through: 'Proformat_Product', as: 'Items'})
    Proformat.belongsTo(models.Account, {as: 'Client'});
  };
  return Proformat;
};