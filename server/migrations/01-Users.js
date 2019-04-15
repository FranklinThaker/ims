'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      username: {
        allowNull: false,
        type: Sequelize.STRING
      },

      password: {
        allowNull: false,
        type: Sequelize.STRING
      },

      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },

      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },

      email: {
        allowNull: false,
        type: Sequelize.STRING
      },

      contactNo: {
        allowNull: false,
        type: Sequelize.NUMERIC(10)
      },

      role: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },

      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Users');
  }
};