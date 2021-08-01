'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "CASCADE",
    }
  }, {});
  Tag.associate = function(models) {
    Tag.belongsTo(models.User, { foreignKey: "userId" });
    
    const columnMapping = {
      through:{
        model: 'MemoryTag',
        unique: false
      },  //Join table
      otherKey: 'memoryId',  //Key that points to the other entity, Memory
      foreignKey: 'tagId'    // Key that points to this entity, Tag
    }
    
    Tag.belongsToMany(models.Memory, columnMapping)
  };
  return Tag;
};