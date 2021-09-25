require('dotenv').config();
const { SERVER_PORT } = process.env;

const express = require('express');
const server = express();

const { resolve } = require('path');

server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static('public'));

const exphbs = require('express-handlebars');
const helpers = require('./helpers');

server.engine('hbs', exphbs({
    helpers,
    extname: '.hbs'
}));

server.set('view engine', 'hbs');
server.set('views', resolve(__dirname, 'views'));

const routes = require('./routes');
server.use(routes);

server.listen(SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${SERVER_PORT}`);
});