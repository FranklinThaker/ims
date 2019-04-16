const db = require('../models/index.js');

// eslint-disable-next-line prefer-destructuring
const categories = db.Categories;
exports.createNewCategories = async function (req, res) {
  let data;
  try {
    data = await categories.create({
      categoryType: req.body.categoryType
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

exports.getAllCategories = async function (req, res) {
  let data;
 
  try {
    data = await categories.findAll({
      
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

exports.updateCategories = async function (req, res) {
  let data;
  try {
    data = await categories.update({
      categoryType: req.body.categoryType,
    },
      { where: { id: req.params.id } });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To Update.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'Updated Successfully',
      data,
    });
  }
};

exports.deleteCategories = async function (req, res) {
  let data;
  try {
    data = await categories.destroy({ where: { id: req.params.id } });
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

exports.getCategoryById = async function (request, response) {
  let data
  try {
    data = await categories.find({
      where: { id: request.params.id },
    }); 
  } catch (err) {
    response.status(404).json({
      status: false,
      message: 'unable to fetch data',
      data: err,
    })
  }
  if (data) {
    response.status(200).json({
      status: true,
      message: 'ID fetched successfully',
      data: data,
    })
  }
}

exports.getCategoryId = async function (req, res) {
  let data;

  try {
    data = await categories.findAll({
      attributes: ['id']
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
