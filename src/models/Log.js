'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    username: DataTypes.STRING,
    text: DataTypes.STRING,
    date: DataTypes.STRING,
    type: DataTypes.BOOLEAN,
    updatedAt: DataTypes.STRING,
    createdAt: DataTypes.STRING
  }, {});
  Log.associate = function(models) {
    // associations can be defined here
  };
  return Log;
};