'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Invoices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            invoicerId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Invoicers',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            invoiceSerial: {
                allowNull: false,
                type: Sequelize.STRING
            },
            itemName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            quantity: {
                allowNull: false,
                type: Sequelize.NUMERIC(3)
            },
            rate: {
                allowNull: false,
                type: Sequelize.NUMERIC(6)
            },
            amount: {
                allowNull: false,
                type: Sequelize.NUMERIC(7)
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Invoices');
    }
};