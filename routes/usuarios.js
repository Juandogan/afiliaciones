const { Router } = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const router = Router()
const emailer = require('../controllers/mails')
const data = require('../models/notificacionModel');
const emailerRec = require('../controllers/mailsrec')
let webpush = require('web-push')
const multipart = require('connect-multiparty');
const path = require ('path')
var express = require('express');

const multiPartMiddleware = multipart({
  uploadDir: './subidas'   //carpeta fisica se debe crear para que funcione
});

router.use('/upload', express.static(path.resolve('./subidas')))
router.post('/upload', multiPartMiddleware, (req, res) => {
    var link = req.files['upload'].path  //ojo con archivos!
    console.log(link)

    var url = 'http://66.97.44.139/feva/upload/' + link.slice(8)
    console.log({ 'url': url })
    res.json({ 'url': url }); //devuelvo el link para guardar en la base de datos. 

  });



// enviar PUSH
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
              "action": "https://google.com",
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
    router.route('/enviar').post(enviarPush);

    
// enviar PUSH

// guardar TOKEN PUSH

router.put('/guardar/:_id', async (req,res) => {
  const { _id } = req.params;
  const articulo = { 
  
              tokenPush:req.body

            };                
       await User.findByIdAndUpdate(_id, {$set: articulo}, {new: true});
       res.json('Articulo Creado!');

      })



      ////SUBIR ARCHIVOS
      


      ////SUBIR ARCHIVOS
      

//

router.get('/notificaciones/' , async(req, res)=> {
  const notificaciones = await data.find(); 
    res.json(notificaciones);
});

// testeando
router.get('/recuperar/:_id' , async(req,res) => { 
  try { 
      const data = await User.findById(req.params._id)    
      if(!data){
        return res.status(400).send('errorUsuario');
      }

             const { _id } = req.params;
          const notificacion = {         
          nombre:req.body.nombre,
          email:req.body.email,
          password:req.body.password,
          subtitulo:req.body.subtitulo,
          verficada:req.body.verificada,
          vistas:req.body.vistas,     
          tokenPush:req.body.tokenPush
         
                 };
        
           await data.findByIdAndUpdate(_id, {$set: notificacion}, {new: true});
           res.json('Articulo modificado!');     
      

      return res.json({"msj":"mail enviado"})


                 
    } catch (err) {
   return res.status(400).send('Error de conexion');
    }   

}); 

router.put('/recuperar/:_id' , async(req,res) => { 
  try { 
console.log(req.params._id)
      const data = await User.findOne({_id:(req.params._id)})    
      if(!data){
        return res.status(400).send('errorUsuario');
      }

   
                 
    } catch (err) {
   return res.status(400).send('Error de conexion');
    }   

}); 


// testeando

router.post('/notificaciones/' , async (req, res)=>{    
  console.log(req.body)
  const notificaciones = new data({
   
   imagen:req.body.imagen,
   categoria:req.body.categoria,
   titulo:req.body.titulo,
   subtitulo:req.body.subtitulo,
   cuerpo:req.body.cuerpo,
   vistas:req.body.vistas,  
   estado:req.body.estado         

 });
    await notificaciones.save();
    res.json('Articulo creado!');
 })
 

 router.get('/notificaciones/:_id' , async(req,res) => { 

  try {
      const notificacion = await data.findById(req.params._id)    
            res.json(notificacion)               
    } catch (err) {
      res.json('ID no encontrado..')
    }

});

router.delete('/notificaciones/:_id', async (req,res) => {
  const { _id } = req.params;
    await data.findByIdAndDelete(_id);
      res.json("Eliminado!");
});


router.put('/notificaciones/:_id', async (req,res) => {
  const { _id } = req.params;
  const notificacion = {         
    imagen:req.body.imagen,
    categoria:req.body.categoria,
    titulo:req.body.titulo,
    subtitulo:req.body.subtitulo,
    cuerpo:req.body.cuerpo,
    vistas:req.body.vistas,  
    estado:req.body.estado     
   
              };
  
     await data.findByIdAndUpdate(_id, {$set: notificacion}, {new: true});
     res.json('Articulo modificado!');

});



//verifyToken  usuar luego de la ruta para veriicar usuarios
router.get('/usuarios/' ,verifyToken, async(req, res)=> {

  const usuarios = await User.find(); 
    res.json(usuarios);

});

 
router.get('/usuarios/:_id' , async(req,res) => { 
    console.log(req.params._id)
    try {
        const user = await User.findById(req.params._id)    
        res.json(user)
               
      } catch (err) {
        res.json('ID no encontrado..')
      }

});

    

router.delete('/usuarios/:_id', async (req,res) => {
    const { _id } = req.params;
      await User.findByIdAndDelete(_id);
        res.json("Eliminado!");
  });



router.post('/usuarios/signup' , async (req, res)=>{    
 const { email, password, role, nombre } = req.body

  const checkUser = await User.findOne({email})

 if (checkUser) {
  return res.status(400).send('Usuario ya existe');
 }

 const newUser = new User({ email, password, role, nombre }) 
  await newUser.save() 
  const token = jwt.sign({_id: newUser._id, role: newUser.role}, 'secretKey' )
   res.status(200).json({token})
  emailer.sendMail(newUser)
})


router.post('/usuarios/signin', async (req,res)=>{
const {email, password} = req.body;
const user = await User.findOne({email});
 

if(!user) return res.status(400).send('errorUsuario');else{
if(!user.verificada) return res.status(400).send('errorVerificada');
}
if(user.password !== password) return res.status(400).send('errorPassword');

const token = jwt.sign({_id: user._id, role: user.role},'secretKey') ////reparacion
console.log(token, user.role) 
return res.json(token)

})
 



router.put('/validar/:_id', async (req,res) => {
    const { _id } = req.params;
    const articulo = { 
          
                verificada:req.body.verificada

              };
    
       await User.findByIdAndUpdate(_id, {$set: articulo}, {new: true});
       res.json('Articulo modificado!');

});
    


module.exports = router


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
