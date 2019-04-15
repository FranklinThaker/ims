'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoicers = sequelize.define('Invoicers', {
    invoicerName: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  Invoicers.associate = function(models) {
    // associations can be defined here
  };
  return Invoicers;
};