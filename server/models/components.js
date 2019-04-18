'use strict';
module.exports = (sequelize, DataTypes) => {
  const Components = sequelize.define('Components', {
    categoryId: DataTypes.INTEGER,
    componentName: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    serialNo: DataTypes.STRING,
    warrantyDate: DataTypes.DATE,
    assignedTo: DataTypes.INTEGER,
    assignedBy: DataTypes.INTEGER
  }, {});
  Components.associate = function (models) {
    // associations can be defined here
  };
  return Components;
};