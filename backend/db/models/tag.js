'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Tag.associate = function(models) {
    Tag.hasMany(models.MemoryTag, { foreignKey: 'tagId' });
  };
  return Tag;
};