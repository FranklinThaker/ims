'use strict';
module.exports = (sequelize, DataTypes) => {
  const Invoices = sequelize.define('Invoices', {
    invoicerId:DataTypes.INTEGER,
    invoiceSerial: DataTypes.STRING,
    itemName: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    rate: DataTypes.INTEGER,
    amount: DataTypes.INTEGER
  }, {});
  Invoices.associate = function(models) {
    // associations can be defined here
  };
  return Invoices;
};