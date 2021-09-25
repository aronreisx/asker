const express = require('express');
const route = express.Router();

const question = require('./controllers/questionController');
const room = require('./controllers/roomController');

route.get('/', (req, res) => res.render('index'));
route.get('/create-pass', (req, res) => res.render('create-pass'));

route.get('/room/:room', room.open);
route.post('/create-room', room.create);
route.post('/enter-room', room.enter);

route.post('/question/create/:room', question.create);
route.post('/question/:room/:question/:action', question.index);

module.exports = route;