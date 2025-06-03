'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECOND = 5000;

const countConnect = () => {
    const numConnections = mongoose.connections.length;
    console.log(`Number of active connections: ${numConnections}`);

}

// check overload connections
const chechOverLoad = () => {
    setInterval(() => {
        const numConnections = mongoose.connections.length;

        const numberCore = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        //ex maximum number of connections based on number osf cores
        const maxConnecetions = numberCore * 5; // 5 connections per core 

        console.log(`Active connect: ${numConnections}`);
        console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);

        if (numConnections > maxConnecetions) {
            console.log('connections overload');

        }
    }, _SECOND) //Moniter every 5 seconds
}

module.exports = {
    countConnect,
    chechOverLoad
}