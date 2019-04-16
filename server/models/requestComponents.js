'use strict';
module.exports = (sequelize, DataTypes) => {
    const RequestComponents = sequelize.define('RequestComponents', {
        userId: DataTypes.INTEGER,
        categoryId: DataTypes.INTEGER,
        componentId: DataTypes.INTEGER,
        componentName: DataTypes.STRING,
        issue: DataTypes.STRING,
        status: DataTypes.STRING,
    }, {});
    RequestComponents.associate = function (models) {
        // associations can be defined here
    };
    return RequestComponents;
};