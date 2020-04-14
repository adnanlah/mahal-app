'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
  }, {});
	ProductCategory.associate = function(models) {
    ProductCategory.hasMany(models.Product);
  };
  return ProductCategory;
};