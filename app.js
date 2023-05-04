'use stritc'
const cors = require('cors')
const bodyParser = require ('body-parser');
const { mongoose } = require('./baseMongo'); //mongodb
let webpush = require('web-push')
var express = require('express');

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
app.use('/feva/recuperar', require ('./routes/recuperar'))

webpush.setVapidDetails(
    
    'mailto:test@example.com',
    'BPNaYZfqzUVzLm2Of4v4EJEc2lnsOOg0q3sRcOtlpHjxrYPj241j179upeTUnaxAx-6ORKojlX_nYK-sgGEF-Wg',
    'n2GM0DnvpfoeNFGMkauaNr4j8OVZYZ3Qoh4eY9K_5DU'
);


const options = {
    vapidDetails: {
      subject: 'mailto:test@example.com',
      publicKey: 'BPNaYZfqzUVzLm2Of4v4EJEc2lnsOOg0q3sRcOtlpHjxrYPj241j179upeTUnaxAx-6ORKojlX_nYK-sgGEF-Wg',
      privateKey:   'n2GM0DnvpfoeNFGMkauaNr4j8OVZYZ3Qoh4eY9K_5DU'
    }
  };

const enviarPush = (req, res) => {
  const pushSubscription = {
    
    endpoint:'https://fcm.googleapis.com/fcm/send/fL11xfVuDho:APA91bGlLxKcTpBUwT1BAGZnaeJvLQ-7c16Lq7qHmdSUhQ11JgzqsfeECTtgnbcPCfrcJ3CVYAEU3AC81C3X6-7UgFQhvT_DUxHzJbD2CYW327MU7xVOGjZkobBdkw26A0eyxeQHAxg7',
     keys: {
     auth: 'FkUP9nzsV-u3CHElytjw5w',
     p256dh: 'BBBEOH0EXnPtygf5TGv23FoDGmS-96WnYjDOXYYnBxAbmSLPCbx6HDK4Hu44gKrq8ZgKU-oJBNo42JdbCSjv9wo'
    }
  };

  let payload = JSON.stringify({
    "notification": {
      "title": "FEVA",
      "body": "Nueva notificacion",
      "icon": "http://192.168.48.132:4200/assets/icon-blanco.png"
    }
  });

  webpush.sendNotification(pushSubscription, JSON.stringify(payload),options)
    .then(res => {
      console.log('Enviado:', res)
      res.send('enviado')
    })
    .catch(err => {
      console.log('Error:', err)
      res.send(err)
    });
};  

 
app.route('/enviar').post(enviarPush);
app.use


app.get('*', function(req, res, next){res.sendFile(path.resolve('client/frontend/index.html'))}); 
const { application } = require('express');
var port  = process.env.PORT || 3100;
app.listen(port, function(){
console.log('Servidor corriendo ', port);});

 


// app.use('/sql', require('./routes/crudSql'))
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
