'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    name: DataTypes.STRING
  }, {});
  ProductCategory.associate = function(models) {
    ProductCategory.hasMany(models.Product);
  };
  return ProductCategory;
};