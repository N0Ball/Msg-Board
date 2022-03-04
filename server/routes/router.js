const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/', services.homeRoutes);

route.post('/users', controller.create);
route.get('/users', controller.find);
route.put('/users/:id', controller.update);
route.delete('/users/:id', controller.delete);

module.exports = route;