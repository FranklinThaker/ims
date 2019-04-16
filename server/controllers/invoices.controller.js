const db = require('../models/index.js');

const invoices = db.Invoices;
exports.createInvoices = async function (request, response) {
  let data;
  try {
    data = await invoices.create({
      invoicerId: request.body.invoicerId,
      invoiceSerial: request.body.invoiceSerial,
      itemName: request.body.itemName,
      quantity: request.body.quantity,
      rate: request.body.rate,
      amount: request.body.amount,
    });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'unable to insert data',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'data inserted',
      data,
    });
  }
};
exports.getAllInvoices = async function (request, response) {
  let data;

  // PAGINATION
  let skipping = request.query.skip;
  let limiting = request.query.limit;
  let searching = request.query.search;
  // eslint-disable-next-line prefer-destructuring
  const asc = request.query.asc;
  // eslint-disable-next-line prefer-destructuring
  let sort = request.query.sort;
  let x = 'ASC';
  // eslint-disable-next-line prefer-destructuring
  const Op = db.Sequelize.Op;
  if (skipping === null || skipping === undefined || skipping === '') {
    skipping = 0;
  }
  if (limiting === '' || limiting === null || limiting === undefined) {
    limiting = null;
  }
  if (searching === null || searching === undefined) {
    searching = '';
  }
  if (sort === null || sort === undefined || sort === '') {
    sort = 'id';
  }
  if (asc === '0') {
    x = 'DESC';
  } else {
    x = 'ASC';
  }
  try {
    data = await invoices.findAll({
      where: { itemName: { [Op.iLike]: `${searching}%` } },
      order: [[sort, x]],
      offset: skipping,
      limit: limiting,
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
      metadata: {
        skip: request.query.skip,
        limit: request.query.limit,
        search: request.query.search,
      },
    });
  }
};
exports.updateInvoices = async function (request, response) {
  let data;
  try {
    updateInvoice = await invoices.update({
      invoicerId: request.body.invoicerId,
      invoiceSerial: request.body.invoiceSerial,
      itemName: request.body.itemName,
      quantity: request.body.quantity,
      rate: request.body.rate,
      amount: request.body.amount,
    }, { where: { id: request.params.id } });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'Unable To Update.',
      data: err,
    });
  }
  if (updateInvoice !== undefined) {
    response.status(200).json({
      status: true,
      message: 'Updated Successfully',
      data,
    });
  }
};
exports.deleteInvoices = async function (request, response) {
  let data;
  try {
    data = await invoices.destroy({ where: { id: request.params.id } });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'Unable To Delete.',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'Deleted Successfully',
      data,
    });
  }
};