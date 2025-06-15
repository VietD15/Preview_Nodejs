'use strict';

const mongoose = require('mongoose');

const {db:{host, name, port}} = require('../configs/config.mongodb'); // Importing config is not necessary here, but can be used for other configurations
const dbURI =`mongodb://${host}:${port}/${name}`; // Corrected the variable name from 'port' to 'post' in the URI

const { countConnect } = require('../helpers/chech.connect');

class MongoDB {
    constructor() {
        this.connect();
    }

    //connect method
    connect(type = 'mongodb') {
        if(1 === 1){
            mongoose.set('debug', true);
            mongoose.set('debug', {color:true});
        }

        mongoose.connect(dbURI,{
            maxPoolSize: 10, // Set max pool size
        }
        ).then(_ => console.log(`Connected to MongoDB at ${dbURI} ` ,countConnect()))
            .catch(err => {
                console.error('MongoDB connection error:', err);
                process.exit(1);
            })
    }

    static getInstance() {
        if(!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }

        return MongoDB.instance;
    }
}

const instanceMongoDb = MongoDB.getInstance();
module.exports = instanceMongoDb;