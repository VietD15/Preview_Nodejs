//npm i express --save
const express = require('express');
const app = express();

const morgan = require('morgan');
const helmet = require('helmet'); 

// -----------------init middleware
app.use(morgan('dev')); // logging middleware
app.use(helmet()); // security middleware



// ---------------init db

// require('./dbs/init.mongodb.lv0');
require('./dbs/init,mongodb');
// const { countConnect } = require('./helpers/chech.connect');
// countConnect(); // check number of connections



//--------------init routes
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to the API'
    });
})



//---------init error handler

module.exports = app;   