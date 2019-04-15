const crypto = require('crypto');
const db = require('../models/index.js');
const users = db.Users;

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var nodemailer = require('nodemailer');

exports.createNewUsers = async function (req, res) {
  let data;
  try {
    data = await users.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo,
      role: req.body.role,
      status: req.body.status,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable to save in database',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'saved in database',
      data,
    });
  }
};

exports.getAllUsers = async function (req, res) {
  let data; 
  try {
    data = await users.findAll({
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To List Data.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
    });
  }
};

exports.updateUsers = async function (req, res) {
  try {
    users.findOne({
      where: { id: req.params.id }
    }).then(function (result) {
      return result.update({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNo: req.body.contactNo,
        role: req.body.role,
        status: req.body.status,
      }).then(function (data) {      
        res.status(200).json({
          status: true,
          message: 'Data sucessfully updated!',
          data: data
        })
      });
    });
  }
  catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To Update.',
      data: err,
    });
  }

};

exports.deleteUsers = async function (req, res) {
  let data;
  try {
    data = await users.destroy({ where: { id: req.params.id } });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To Delete.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'Deleted Successfully',
      data,
    });
  }
};

const jwt = require('jsonwebtoken');
exports.login = async function (req, res) {
  let where = { username: req.body.username }
  try {
      var user = await users.find({
          where,
      })
  } catch (error) {
      console.log(error)
      return res.status(400).send(error)
  }
  if (!user) {
      return res.status(401).send({
          message: 'Authentication failed. User not found.',
      });
  }

  user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch && !err) {
          var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 3600 });
          jwt.verify(token, 'nodeauthsecret', function (err, data) {
              console.log(err, data);
          })
          res.json({ success: true, token: 'JWT ' + token, user });
      } else {
          res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
      }
  })
}


exports.getUserDetails = async function (request, response) {
  let data;

  try {
    data = await users.find({
      where: { id: request.params.id },
      attributes: ['username', 'password', 'firstName', 'lastName', 'email', 'contactNo']
    });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'Unable To List Data.',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
    });
  }
};


exports.forgotPassword = function (req, res) {
  console.log(process.env)
  let where = { email: req.body.email }
  let email = req.body.email;
  var token = crypto.randomBytes(20).toString('hex');
  try {
    var user = users.findOne({
      where,
    }).then(function (result) {
      if (result !== null) {
        return result.update({
          passwordResetToken: token,
          passwordResetExpires: Date.now() + 3600000,
        }).then(function (data) {
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.USERNAME,
              pass: process.env.PASSWORD
            }
          });

          var mailOptions = {
            from: 'no-reply-bacancy@yandex.com',
            to: email,
            subject: 'Reset your password',
            text: `Resetting password URL http://${req.hostname}:3000/reset/${token}`
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

          res.status(200).json({
            status: true,
            message: 'Email sent successfully!',
          })
        });
      }
      else {
        res.status(200).json({
          status: false,
          message: 'Email id does not exist!',
        })
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}

exports.resetPassword = function (req, res) {
  try {
    var user = users.findOne({
      where: {
        passwordResetToken: req.params.token,
        passwordResetExpires: {
          [Op.gt]: Date.now(),
        }
      }
    }).then(function (result) {
      if (result !== null) {
        return result.update({
          passwordResetToken: null,
          passwordResetExpires: null,
          password: req.body.password
        }).then(function (data) {
          res.status(200).json({
            status: true,
            message: 'Password reset',
            data: data
          })
        });
      }
      else {
        res.status(400).send("No User Found:(")
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}

exports.checkIfLinkExist = function (req, res) {
  try {
    var user = users.findOne({
      where: {
        passwordResetToken: req.params.token,
        passwordResetExpires: {
          [Op.gt]: Date.now(),
        }
      }
    }).then(function (result) {
      if (result !== null) {
        res.status(200).json({
          status: true,
          message: 'Link exist',
        })
      }
      else {
        res.status(200).json({
          status: false,
          message: 'Link does not exist',
        })
      }
    })

  } catch (error) {
    console.log(error)
    return res.status(400).send(error)
  }
}

