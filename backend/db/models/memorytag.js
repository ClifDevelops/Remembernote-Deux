'use strict';
module.exports = (sequelize, DataTypes) => {
  const MemoryTag = sequelize.define('MemoryTag', {
    memoryId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  MemoryTag.associate = function(models) {
    
  };
  return MemoryTag;
};