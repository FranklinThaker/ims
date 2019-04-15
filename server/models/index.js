'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.authenticate().then(() => {
  // eslint-disable-next-line no-console
  console.log('Connection has been established successfully.');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Unable to connect to the database:', err.message);
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Models/tables
db.Users = require('../models/users.js')(sequelize, Sequelize); 
db.Components = require('../models/components.js')(sequelize, Sequelize); 
db.Categories = require('../models/categories.js')(sequelize, Sequelize); 
db.AssignedComponents = require('../models/assignedComponents.js')(sequelize, Sequelize);

//Relationships
db.Components.belongsTo(db.Categories, {foreignKey: 'categoryId'});
db.AssignedComponents.belongsTo(db.Categories, {foreignKey: 'categoryId'});
db.AssignedComponents.belongsTo(db.Components, {foreignKey: 'componentId'});
db.AssignedComponents.belongsTo(db.Users, {as: 'AssignedBy',foreignKey: 'assignedBy'});
db.AssignedComponents.belongsTo(db.Users, {as: 'AssignedTo', foreignKey: 'userId'});

// db.Users.hasMany(db.Components, {foreignKey: ''})
module.exports = db;
