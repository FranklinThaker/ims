const db = require('../models/index.js');
const users = db.Users;
const components = db.Components;
const categories = db.Categories;
const assignedComponents = db.AssignedComponents;

exports.getAssignedComponentsData = async function (req, res) {
  data = await assignedComponents.findAll({
    include: [
      {
        model: users,
        attributes: ['username'],
        required: true,
        as: 'AssignedTo'
      },
      {
        model: users,
        attributes: ['username'],
        required: true,
        as: 'AssignedBy'
      },
      {
        model: categories,
        attributes: ['categoryType'],
        required: true
      },
      {
        model: components,
        attributes: ['componentName'],
        required: true
      }
    ],
  }).then(function (data) {
    console.log(JSON.stringify(data));
    res.status(200).json({
      status: true,
      message: 'Data sucessfully fetched!',
      data: data
    })
  });
};
