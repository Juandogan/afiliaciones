const { json } = require('body-parser');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    email: String,
    password: String,        
    verificada:String,
    role:String,
    tokenPush:{}    
},
{timestamps: true}
)


module.exports =  model('User', userSchema)