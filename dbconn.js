
const express = require("express");
const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/pizza",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true

}).then(()=>{
    console.log("connet with database");


}).catch((err)=>{
   
});

module.exports = connection