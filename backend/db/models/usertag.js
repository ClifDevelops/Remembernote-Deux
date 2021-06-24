'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTag = sequelize.define('UserTag', {
    userId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {});
  UserTag.associate = function(models) {
    // associations can be defined here
  };
  return UserTag;
};