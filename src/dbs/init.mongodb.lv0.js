'use strict';

const mongoose = require('mongoose');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/shopDev';

mongoose.connect(dbURI).then(_ => console.log(`Connected to MongoDB at ${dbURI}`))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
})

if(1 === 0){
    mongoose.set('debug', true);
    mongoose.set('debug', {color:true});
}

module.exports = mongoose