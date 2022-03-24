const express = require('express');
const route = express.Router();

const verify = require('../middlewares/varify');
const getUser = require('../middlewares/getuser');
const addReplyTag = require('../middlewares/addreplytag');

const services = require('../services/render');
const auth = require('../controller/auth');
const users = require('../controller/users');
const messages = require('../controller/messages');

route.get('/', services.homeRoutes);

route.post('/login', auth.login);
route.get('/check', verify(), auth.validate);

route.post('/users', users.create);
route.get('/users', users.find);
route.put('/users/:id', users.update);
route.delete('/users/:id', users.delete);

route.post('/messages', verify(), messages.create);
route.get('/messages', getUser(), messages.find);
route.put('/messages/:id', verify(), messages.update);
route.delete('/messages/:id', verify(), messages.delete);

route.post('/messages/reply/:id', verify(), addReplyTag(), messages.create);

module.exports = route;