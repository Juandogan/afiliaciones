const { Schema, model } = require('mongoose');

const notificacionesSchema = new Schema({
    imagen: String,
    categoria: String,
    titulo: String,        
    subtitulo:String,
    cuerpo:String,
    vistas:Number    
},
{timestamps: true}
)


module.exports =  model('Notificaciones', notificacionesSchema)



