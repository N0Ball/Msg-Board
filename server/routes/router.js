const express = require('express');
const route = express.Router();

const services = require('../services/render');
const auth = require('../controller/auth');
const verify = require('../middlewares/varify');
const users = require('../controller/users');
const messages = require('../controller/messages');

route.get('/', services.homeRoutes);

route.post('/login', auth.login);

route.post('/users', users.create);
route.get('/users', users.find);
route.put('/users/:id', users.update);
route.delete('/users/:id', users.delete);

route.post('/messages', messages.create);
route.get('/messages', verify(), messages.find);
route.put('/messages/:id', messages.update);
route.delete('/messages/:id', messages.delete);

module.exports = route;