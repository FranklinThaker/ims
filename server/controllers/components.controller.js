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

    try {
        data = await components.findAll({
            include: [{
                model: db.Categories,
                required: true,
                as: 'CategoryDetails',
                attributes: ["categoryType"]
            }]
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

exports.getUnAssignedComponents = async function (req, res) {
    let data;

    try {
        data = await components.findAll({
            include: [{
                model: db.Categories,
                required: true,
                as: 'CategoryDetails',
                attributes: ["categoryType"]
            },
            {
                model: db.Users,
                required: false,
                as: 'UserAssignedBy',
                attributes: ["firstName"]
            },
            {
                model: db.Users,
                required: false,
                as: 'UserAssignedTo',
                attributes: ["firstName"]
            }],

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

exports.AssignComponent = async function (req, res) {
    try {
        components.findOne({
            where: { id: req.params.id }
        }).then(function (result) {
            return result.update({
                assignedTo: req.body.assignedTo,
                assignedBy: req.body.assignedBy,
                status: false
            }).then(function (data) {
                res.status(200).json({
                    status: true,
                    message: 'Component Assigned sucessfully !',
                    data: data
                })
            });
        });
    }
    catch (err) {
        res.status(500).json({
            status: false,
            message: 'Unable To assign component.',
            data: err,
        });
    }
};