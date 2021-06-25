'use strict';
module.exports = (sequelize, DataTypes) => {
  const Memory = sequelize.define('Memory', {
    title: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    dateOfMemory: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    memoryRating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pictureUrl: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Memory.associate = function(models) {
    Memory.belongsTo(models.User, { foreignKey: "userId" });
    Memory.hasMany(models.MemoryTag, { foreignKey: 'memoryId'})
    
  };
  return Memory;
};