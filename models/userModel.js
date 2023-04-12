const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: String,
    email: String,
    password: String,        
    verificada:String,
    role:String
    
},
{timestamps: true}
)


module.exports =  model('User', userSchema)