const db = require('../models/index');

const incidents = db.Incidents;
const incidentUpdates = db.IncidentUpdates;

exports.createIncidents = async function (request, response) {
    let data;
    // eslint-disable-next-line prefer-const
    try {
        data = await incidents.create({
            incidentBy: request.body.incidentBy,
            incidentName: request.body.incidentName,
            incident: request.body.incident,
            updates: request.body.updates,
            resolvedBy: request.body.resolvedBy,
            status: request.body.status,
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

exports.getAllIncidents = async function (request, response) {
    let data;
    
    try {
        data = await incidents.findAll({
            include: [
                {
                  model: db.Users,
                  attributes: ['username', 'id'],
                  required: true,
                  as: 'IncidentBy'
                },
                {
                  model: db.Users,
                  attributes: ['username', 'id'],
                  required: false,
                  as: 'ResolvedBy'
                },
              ],            
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

exports.getIncidentById = async function (request, response) {
    let data;

    try {
        data = await incidents.findAll({
            include: [               
                {
                  model: db.Users,
                  attributes: ['username'],
                  required: false,
                  as: 'ResolvedBy'
                },
              ],      
            where: { incidentBy: request.params.id }
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

exports.getResolvedByName = async function (request, response) {
    let data;

    try {
        data = await db.Users.findAll({
            attributes: ['username','id']
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
exports.getSingleIncidentById = async function (request, response) {
    let data;

    try {
        data = await incidents.find({
            where: { id: request.params.id }
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

exports.updateIncidents = async function (request, response) {
    let data, data1;
    try {
        data = await incidents.update({   
            updates: request.body.updates,
            resolvedBy: request.body.resolvedBy,
            status: request.body.status,
            resolvedBy: request.body.resolvedBy
        }, { where: { id: request.params.id } });
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
    data1 = incidentUpdates.create({
        incidentId: request.params.id,
        updateBy: request.body.updateBy,
        updates: request.body.updates,
        status: request.body.status,
    })
};
exports.deleteIncidents = async function (request, response) {
    let data;
    try {
        data = await incidents.destroy({ where: { id: request.params.id } });
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