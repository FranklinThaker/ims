//All controllers define here
const user = require('../controllers/users.controller');
const reqcomponents = require('../controllers/requestComponent.controller');
const invoices = require('../controllers/invoices.controller');
const invoicers = require('../controllers/invoicers.controller');
const incidentUpdates = require('../controllers/incidentUpdates.controller');
const incidents = require('../controllers/incidents.controller');
const components = require('../controllers/components.controller');
const categories = require('../controllers/categories.controller');
const assignedComponents = require('../controllers/assignedComponents.controller');

//all middlewares define here
const checkSignIn = require('../controllers/middleware.js')
const passport = require('passport');

//all models define here
const db = require('../models/index.js');
const users = db.Users;

require('../config/passport')(passport);

const routes = (app) => {
    app.post('/api/users', user.createNewUsers);
    app.get('/api/users/list', passport.authenticate('jwt', { session: false }), checkSignIn, user.getAllUsers);
    app.put('/api/users/:id', passport.authenticate('jwt', { session: false }), checkSignIn, user.updateUsers);
    app.delete('/api/users/:id', passport.authenticate('jwt', { session: false }), checkSignIn, user.deleteUsers);
    app.get('/api/users/getUserDetails/:id', passport.authenticate('jwt', { session: false }), checkSignIn, user.getUserDetails);

    app.post('/api/users/forgotPassword', user.forgotPassword)
    app.post('/:token', user.resetPassword)
    app.get('/:token', user.checkIfLinkExist)
    

    app.post('/api/users/login/', user.login);

    //routing for RequestComponets table
    app.get('/api/requestComponents/', reqcomponents.getAllRequestedComponents);
    app.post('/api/requestComponents', reqcomponents.createNewRequestComponents);
    app.put('/api/requestComponents/:id', reqcomponents.updateRequestedComponent);
    app.delete('/api/requestComponents/:id', reqcomponents.deleteRequestedComponents);
    app.post('/api/requestComponents/requestComponentByUser', reqcomponents.getRequestedComponentByUser);

    //routing for Invoices Table
    app.get('/api/invoices/', invoices.getAllInvoices);
    app.post('/api/invoices', invoices.createInvoices);
    app.put('/api/invoices/:id', invoices.updateInvoices);
    app.delete('/api/invoices/:id', invoices.deleteInvoices);

    //routing for Invoicers Table
    app.get('/api/invoicers/', invoicers.getAllInvoicers);
    app.post('/api/invoicers', invoicers.createNewInvoicers);
    app.put('/api/invoicers/:id', invoicers.updateInvoicers);
    app.delete('/api/invoicers/:id', invoicers.deleteInvoicers);

    //routing for IncidentUpdates Table
    app.get('/api/incidentUpdates/', incidentUpdates.getAllIncidentUpdates);
    app.post('/api/incidentUpdates', incidentUpdates.createNewIncidentupdates);
    app.put('/api/incidentUpdates/:id', incidentUpdates.updateIncidentUpdates);
    app.delete('/api/incidentUpdates/:id', incidentUpdates.deleteIncidentUpdates);
    app.get('/api/incidentUpdates/details/:id', incidentUpdates.getIncident);

    //routing for Incidents table
    app.get('/api/incidents/', incidents.getAllIncidents);
    app.post('/api/incidents', incidents.createIncidents);
    app.put('/api/incidents/:id', incidents.updateIncidents);
    app.delete('/api/incidents/:id', incidents.deleteIncidents);
    app.get('/api/incidents/getIncidentById/:id', incidents.getIncidentById);
    app.get('/api/incidents/getSingleIncidentById/:id', incidents.getSingleIncidentById);
    app.get('/api/incidents/getResolvedByName/', incidents.getResolvedByName);


    //routing for Components Table
    app.get('/api/components/', components.getAllComponents);
    app.post('/api/components', components.createNewComponents);
    app.put('/api/components/:id', components.updateComponents);
    app.delete('/api/components/:id', components.deleteComponents);
    app.post('/api/components/getComponentName', components.getComponentName);
    app.get('/api/components/getComponentsById/:id', components.getComponentsById);
    app.get('/api/components/getFilteredComponents/:categoryId', components.getFilteredComponents);

    //routing for Categories Table
    app.get('/api/categories/getAllCategories', categories.getAllCategories);
    app.post('/api/categories', categories.createNewCategories);
    app.put('/api/categories/:id', categories.updateCategories);
    app.delete('/api/categories/:id', categories.deleteCategories);
    // app.get('/api/categories/getCategoryById/:id', categories.getCategoryById)
    // app.get('/api/categories/getCategoryId', categories.getCategoryId)
    // app.get('/api/categories/getCategoryName', categories.getCategoryName)
    // app.get('/api/categories/getCategory', categories.getCategory)


    //routing for assignedComponents Table
    app.get('/api/getAssignedComponentsData', assignedComponents.getAssignedComponentsData)

};

module.exports = { routes };

