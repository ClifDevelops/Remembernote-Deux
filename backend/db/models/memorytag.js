'use strict';
module.exports = (sequelize, DataTypes) => {
  const MemoryTag = sequelize.define('MemoryTag', {
    memoryId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE"
    },
    tagId: {
      type: DataTypes.INTEGER,
      onDelete: "CASCADE"
    },
  }, {});
  MemoryTag.associate = function(models) {
    
  };
  return MemoryTag;
};