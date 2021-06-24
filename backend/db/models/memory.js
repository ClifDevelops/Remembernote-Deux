'use strict';
module.exports = (sequelize, DataTypes) => {
  const Memory = sequelize.define('Memory', {
    title: DataTypes.STRING,
    dateOfMemory: DataTypes.DATEONLY,
    location: DataTypes.STRING,
    memoryRating: DataTypes.INTEGER,
    pictureUrl: DataTypes.STRING,
    body: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Memory.associate = function(models) {
    // associations can be defined here
  };
  return Memory;
};