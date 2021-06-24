'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    tagName: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {});
  Tag.associate = function(models) {
    Tag.belongsToMany(models.Memory, { through: 'MemoryTags' });
    Tag.belongsToMany(models.Tag, { through: 'UserTags' });
  };
  return Tag;
};