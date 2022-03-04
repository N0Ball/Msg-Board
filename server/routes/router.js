const express = require('express');
const route = express.Router();

const services = require('../services/render');
const users = require('../controller/users');

route.get('/', services.homeRoutes);

route.post('/users', users.create);
route.get('/users', users.find);
route.put('/users/:id', users.update);
route.delete('/users/:id', users.delete);

module.exports = route;