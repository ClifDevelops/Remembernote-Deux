'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Tag.associate = function(models) {
    
    const columnMapping = {
      through: 'MemoryTag',  //Join table
      otherKey: 'memoryId',  //Key that points to the other entity, Memory
      foreignKey: 'tagId'    // Key that points to this entity, Tag
    }
    Tag.belongsToMany(models.Memory, columnMapping)
  };
  return Tag;
};