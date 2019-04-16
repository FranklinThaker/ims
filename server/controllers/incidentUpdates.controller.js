const db = require('../models/index.js');

// eslint-disable-next-line prefer-destructuring
const incidentUpdates = db.IncidentUpdates;
exports.createNewIncidentupdates = async function (request, response) {
    let data;
    try {
        data = await incidentUpdates.create({
            incidentId: request.body.incidentId,
            updateBy: request.body.updateBy,
            status: request.body.status,
            update: request.body.update,
        });
    } catch (err) {
        response.status(500).json({
            status: false,
            message: 'Unable to save in database',
            data: err,
        });
    }
    if (data !== undefined) {
        response.status(200).json({
            status: true,
            message: 'saved in database',
            data,
        });
    }
};

exports.getAllIncidentUpdates = async function (request, response) {
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
        data = await incidentUpdates.findAll({
            where: { update: { [Op.iLike]: `${searching}%` } },
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

exports.updateIncidentUpdates = async function (request, response) {
    let data;
    try {
        data = await incidentUpdates.update({
            incidentId: request.body.incidentId,
            updateBy: request.body.updateBy,
            status: request.body.status,
            update: request.body.update,
        },
            { where: { id: request.params.id } });
    } catch (err) {
        response.status(500).json({
            status: false,
            message: 'Unable To Update.',
            data: err,
        });
    }
    if (data !== undefined) {
        response.status(200).json({
            status: true,
            message: 'Updated Successfully',
            data,
        });
    }
};

exports.deleteIncidentUpdates = async function (request, response) {
    let data;
    try {
        data = await incidentUpdates.destroy({ where: { id: request.params.id } });
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

exports.getIncident = async function (request, response) {
    let data;
    try {
        data = await incidentUpdates.findAll({
            include: [               
                {
                  model: db.Incidents,
                  required: true,
                  as: 'IncidentDetails'
                },
                {
                    model: db.Users,
                    required: true,
                    as: 'UserDetails',
                    attributes: ['username','firstName']
                  },
              ],                    
            where: { incidentId: request.params.id }
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