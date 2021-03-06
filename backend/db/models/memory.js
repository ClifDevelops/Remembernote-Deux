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
      allowNull: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
    }
  }, {});
  Memory.associate = function(models) {
    Memory.belongsTo(models.User, { foreignKey: "userId" });

    const columnMapping = {
      through:{
        model: 'MemoryTag',
        unique: false
      },  //Join table
      otherKey: 'tagId',     //Key that points to the other entity, Tag
      foreignKey: 'memoryId' // Key that points to this entity, Memory
    }
    Memory.belongsToMany(models.Tag, columnMapping)
    
  };
  return Memory;
};