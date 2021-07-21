
const mongoose = require("mongoose");
const express = require("express");

const createSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    image:{
        type:String,
        required:true
    },
   
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    }
});



const pizzacollection = new mongoose.model("Menu",createSchema);

module.exports = pizzacollection;