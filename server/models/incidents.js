'use strict';
module.exports = (sequelize, DataTypes) => {
  const Incidents = sequelize.define('Incidents', {
    incidentBy:DataTypes.INTEGER,
    incident:DataTypes.STRING,
    incidentName:DataTypes.TEXT,
    updates:DataTypes.STRING,
    resolvedBy:DataTypes.INTEGER,
    status:DataTypes.STRING,
  }, {});
  Incidents.associate = function(models) {
    // associations can be defined here
  };
  return Incidents;
};