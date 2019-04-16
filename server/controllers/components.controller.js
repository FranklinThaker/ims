const db = require('../models/index.js');

// eslint-disable-next-line prefer-destructuring
const components = db.Components;
exports.createNewComponents = async function (req, res) {
    let data;
    try {
        data = await components.create({
            userId: req.body.userId,
            categoryId: req.body.categoryId,
            componentName: req.body.componentName,
            status: req.body.status,
            serialNo: req.body.serialNo,
            warrantyDate: req.body.warrantyDate,
            assignedTo: req.body.assignedTo,
            assignedBy: req.body.assignedBy
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

exports.getAllComponents = async function (req, res) {
    let data;

    // PAGINATION
    let skipping = req.query.skip;
    let limiting = req.query.limit;
    let searching = req.query.search;
    // eslint-disable-next-line prefer-destructuring
    const asc = req.query.asc;
    // eslint-disable-next-line prefer-destructuring
    let sort = req.query.sort;
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
        data = await components.findAll({
            where: { componentName: { [Op.iLike]: `${searching}%` } },
            order: [[sort, x]],
            offset: skipping,
            limit: limiting,
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
            metadata: {
                skip: req.query.skip,
                limit: req.query.limit,
                search: req.query.search,
            },
        });
    }
};

exports.updateComponents = async function (req, res) {
    let data;
    try {
        data = await components.update({
            userId: req.body.userId,
            categoryId: req.body.categoryId,
            componentName: req.body.componentName,
            status: req.body.status,
            serialNo: req.body.serialNo,
            warrantyDate: req.body.warrantyDate,
            assignedTo: req.body.assignedTo,
            assignedBy: req.body.assignedBy
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

exports.deleteComponents = async function (req, res) {
    let data;
    try {
        data = await components.destroy({ where: { id: req.params.id } });
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


exports.getComponentName = async function (request, response) {
    let data
    try {
        data = await components.findAll({
            where: { categoryId: request.body.categoryId },
            attributes: ['componentName', 'id']
        });
    } catch (err) {
        response.status(500).json({
            status: false,
            message: 'unable to fetch data',
            data: err,
        })
    }
    if (data) {
        response.status(200).json({
            status: true,
            message: 'fetched successfully',
            data: data,
        })
    }
}

exports.getComponentsById = async function (req, res) {
    let data;

    try {
        data = await components.find({
            where: { id: req.params.id },
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

exports.getFilteredComponents = async function (req, res) {
    let data;

    try {
        data = await components.findAll({
            where: { categoryId: req.params.categoryId },
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