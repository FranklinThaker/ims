'use strict';
var bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNo: DataTypes.NUMERIC(10),
    role: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN,

    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  }, {
      hooks: {
        beforeCreate: function (user) {
          if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          }
        },
        beforeUpdate: function (user) {
          if (user.changed('password')) {
            user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
          }
        },
      },
    });

  Users.prototype.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
      if (err) {
        return cb(err);
      }
      cb(null, isMatch);
    });
  };


  Users.associate = function (models) {
    // associations can be defined here
  };
  return Users;
};
