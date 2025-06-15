//npm i express --save
const express = require('express');
const app = express();

require('dotenv').config(); // Load environment variables from .env file
const morgan = require('morgan');
const helmet = require('helmet'); 
const compression = require('compression');


// -----------------init middleware
app.use(morgan('dev')); // logging middleware
app.use(helmet()); // security middleware
app.use(compression()); // compression middleware
app.use(express.json()); // parse JSON bodies
app.use(express.urlencoded({
    extended: true // parse URL-encoded bodies
}))


require('./dbs/init,mongodb');
// const { countConnect } = require('./helpers/chech.connect');
// countConnect(); // check number of connections



//--------------init routes
// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Welcome to the API'
//     });
// })
app.use('/', require('./routers/index'));



//---------init error handler

module.exports = app;   