'use strict';
module.exports = (sequelize, DataTypes) => {
  const IncidentUpdates = sequelize.define('IncidentUpdates', {
    incidentId:DataTypes.INTEGER,
    updateBy:DataTypes.INTEGER,
    status:DataTypes.STRING,
    updates:DataTypes.STRING,
  }, {});
  IncidentUpdates.associate = function(models) {
    // associations can be defined here
  };
  return IncidentUpdates;
};