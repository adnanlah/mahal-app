'use strict';
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    base64: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    
  };
  return Image;
};