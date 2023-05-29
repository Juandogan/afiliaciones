'use stritc'
const cors = require('cors')
const bodyParser = require ('body-parser');
const { mongoose } = require('./baseMongo'); //mongodb
let webpush = require('web-push')
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
// app.use('/feva/notificaciones', require('./routes/crudMongo'))
app.use('/feva', require('./routes/usuarios'))
//app.use('/feva/recuperar', require ('./routes/recuperar'))

// {"publicKey":"BMdnZijmRyNbEvQbkVdfAhwzWhFIgHqGJZlfnAIiCev_fFtsuwlKGP_1nTfr_rG-idgjK-QolsZkmw6cuzM_Kvo","privateKey":"5Jdr3pE-gc6sBzgMGzmMcdmuNAUnK0J4QvoZWxqreJA"}

const vapidKeys = {
  "subject": "mailto: <juandogan@gmail.com>",
  "publicKey": "BMiSLRLCfg7i7-uO0AJ7IZwN0BJi5ow5I3qvBrfJg7pAR_FohLmJV-Jv5aEAzRPRabYVM70yDW63uAFAuyQdaTY",
  "privateKey": "U_tDWAh1rXIFO0-uAq2tkIWWTconSSOIeLmFJklMz_M"
};


webpush.setVapidDetails(    
    vapidKeys.subject,
     vapidKeys.publicKey,
     vapidKeys.privateKey
);




const enviarPush = async (req, res) => {
        
  const allSubscriptions = await User.distinct('tokenPush')
          console.log(allSubscriptions)
           res.json(allSubscriptions)


  console.log('Total subscriptions', allSubscriptions.length);

  const notificationPayload = {
      "notification": {
          "title": "Angular News",
          "body": "Newsletter Available!",
          "icon": "assets/main-page-logo-small-hat.png",
          "vibrate": [100, 50, 100],
          "data": {
              "dateOfArrival": Date.now(),
              "primaryKey": 1
          },
          "actions": [{
              "action": "explore",
              "title": "Go to the site"
          }]
      }
  };

  Promise.all(allSubscriptions.map(sub => webpush.sendNotification(
      sub, JSON.stringify(notificationPayload) )))
      .then(() => 
      // res.status(200).json({message: 'Newsletter sent successfully.'})     
      console.log('salio')
      )
      .catch(err => {
          // console.error("Error sending notification, reason: ", err);
          // res.sendStatus(500);
          console.log('salio')
      });
    }

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

 
app.route('/enviar').post(enviarPush);
 

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
