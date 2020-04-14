'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recette = sequelize.define('Recette', {
    amount: DataTypes.FLOAT,
    amount_text: DataTypes.STRING,
    motive: DataTypes.STRING,
    client_name: DataTypes.STRING,
    client_info: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Recette.associate = function(models) {
    // associations can be defined here
  };
  return Recette;
};