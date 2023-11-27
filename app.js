'use stritc'
const cors = require('cors')
const bodyParser = require ('body-parser');
const { conexion } = require('./baseSQL'); //mongodb
const { mongoose } = require('./baseMongo'); //mongodb

var express = require('express');
const User = require('./models/userModel')
var app = express();


   

//MIDDLEWARE
app.use(express.json())
app.use(cors());
app.use(bodyParser.json({limit: '200mb'}))
const path = require ('path')
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}))
app.use('/feva',express.static('client/frontend', {redirect:false}))
 app.use('/feva/notificaciones', require('./routes/crudMongo'))
app.use('/feva', require('./routes/usuarios'))
//app.use('/feva/recuperar', require ('./routes/recuperar'))

// {"publicKey":"BMdnZijmRyNbEvQbkVdfAhwzWhFIgHqGJZlfnAIiCev_fFtsuwlKGP_1nTfr_rG-idgjK-QolsZkmw6cuzM_Kvo","privateKey":"5Jdr3pE-gc6sBzgMGzmMcdmuNAUnK0J4QvoZWxqreJA"}


//   const pushSubscription = {
//     "endpoint": "https://fcm.googleapis.com/fcm/send/d2clykHVgxQ:APA91bFnOhUcmCBUotuHtx1ZDMRRA7jSgPXgixQBWGhf4R5NxRXVv8RaCAjb07lP6qjF8_8hhuJRllKirYSF38xyPWeB6NqD1Lq5MZyQUJfPK-sP0fw1pEA2GkSmZu_JFUo1y2rF9A2T",
//     "expirationTime": null,
//     "keys": {
//         "p256dh": "BDluRQgjZQqbijUedWlbeMnUSPRwtpBJtA1yzPXWx3g8nu7Wum_yr6NYL0SYNBSoMqTYEHO2OUZ2LZCX2ytjJdc",
//         "auth": "R5Ujj1XbO2gQjKJJAXplyw"
//     }
// }

//   let payload = JSON.stringify({
//     "notification": {
//       "title": "FEVA",
//       "body": "Nueva notificacion",
 
//     }
//   });

//   webpush.sendNotification(pushSubscription, payload)
//     .then(res => {
//       console.log('Enviado:')
//       return res
//     })
//     .catch(err => {
//       console.log('Error:', err)
//       return res
//     });
// };  

 
app.use('/sql', require('./routes/crudSql'))



app.get('*', function(req, res, next){res.sendFile(path.resolve('client/frontend/index.html'))}); 
const { application } = require('express');
var port  = process.env.PORT || 3100;
app.listen(port, function(){
console.log('Servidor corriendo ', port);});

 



// app.use('/data', require('./routes/crudMongo'))

 

module.exports = app; 



function verifyToken(req, res, next){
    if(!req.headers.authorization) {
    return res.status(401).send('Sin autorizacion')
}
const token = req.headers.authorization.split(' ')[1]
        if (token === "null"){
            return res.status(401).send('Sin autorizacion')
        }

const payload = jwt.verify(token, 'secretKey')
            req.userID = payload._id
            next();

}
           
//conexcion Mongo

// var mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://fevasistemas:fevasistemas.12@cluster0.5jm6mcy.mongodb.net/?retryWrites=true&w=majority', (err, res)=>{
//     if(err){console.log(err);
//     }else{

//         app.listen(port, function(){
//             console.log('Servidor corriendo ', port);
//         });
//         }
// })
