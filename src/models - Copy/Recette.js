'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recette = sequelize.define('Recette', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    amount: DataTypes.FLOAT,
    amount_text: DataTypes.STRING,
    motive: DataTypes.STRING,
    client_name: DataTypes.STRING,
    client_info: DataTypes.STRING,
    full_date: DataTypes.STRING,
    date: DataTypes.STRING
  }, {});
  Recette.associate = function(models) {
    // Recette.belongsTo(models.Task);
  };
  return Recette;
};