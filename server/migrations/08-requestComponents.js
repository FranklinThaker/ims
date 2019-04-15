'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('RequestComponents', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },
            categoryId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },

            componentId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Components',
                    key: 'id',
                },
                onUpdate: 'cascade',
                onDelete: 'cascade',
            },

            componentName: {
                allowNull: false,
                type: Sequelize.STRING
            },

            issue: {
                allowNull: false,
                type: Sequelize.STRING
            },

            status: {
                type: Sequelize.STRING
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
        return queryInterface.dropTable('RequestComponents');
    }
};