'use strict';

const mongoose = require('mongoose');

const countConnect=() => {
    const numConnections = mongoose.connections.length;
    console.log(`Number of active connections: ${numConnections}`);
}

module.exports = {
    countConnect
}