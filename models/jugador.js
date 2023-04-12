'use strict'

var mongoose= require('mongoose')
var Schema = mongoose.Schema

var JugadorSchema = Schema({
    id:{type: String, required:true},
    nombre:{type: String, required:true},
    dni:{type: String, required:true},
    


})
