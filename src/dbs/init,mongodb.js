'use strict';

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopDev';

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

        mongoose.connect(dbURI).then(_ => console.log(`Connected to MongoDB at ${dbURI} PRO` ,countConnect()))
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