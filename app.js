'use stritc'
const cors = require('cors')
const bodyParser = require ('body-parser');
const { mongoose } = require('./baseMongo'); //mongodb
var express = require('express');

var app = express();
   

//MIDDLEWARE
app.use(express.json())
app.use('/',express.static('client/frontend', {redirect:false}));
app.use(cors());
app.use(bodyParser.json({limit: '200mb'}));
const path = require ('path')
app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
app.use('/usuarios', require('./routes/usuarios'))
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
