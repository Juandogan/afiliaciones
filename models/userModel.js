const { json } = require('body-parser');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    email: String,
    password: String,        
    verificada:String,
    role:String,
    dni:Number,
    estado:String,
    tokenPush:{}    
},
{timestamps: true}
)


module.exports =  model('User', userSchema)