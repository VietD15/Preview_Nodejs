'use strict';


//!dmbg
// const mongoose = require('mongoose'); // Erase if already required

const {Schema,model,Types} = require('mongoose');

const DOCUMENT_NAME = 'Shop'; // Define the document name for the collection
const COLLECTION_NAME = 'shops'; // Define the collection name in MongoDB

// Declare the Schema of the Mongo model
var shopSchema = new Schema({
    name:{
        type:String,
       trim:true,
       maxLenght:150,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
       required:true,
    },
    status:{
        type:String,
        enum:['active','inactive','blocked'],
        default:'active',
    },
    verfify:{
        type: Schema.Types.Boolean,
        default: false,
    },
    roles:{
        type:Array,
        default:[],
    }
   
},{
     timestamps:true,
     collection:COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);