'use strict';
module.exports = (sequelize, DataTypes) => {
  const AssignedComponents = sequelize.define('AssignedComponents', {
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    componentId: DataTypes.STRING,
    assignedBy: DataTypes.BOOLEAN,
  }, {});
  AssignedComponents.associate = function (models) {
    // associations can be defined here
  };
  return AssignedComponents;
};