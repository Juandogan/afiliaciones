const { Router } = require('express');
const jwt = require('jsonwebtoken');
const data = require('../models/notificacionModel');
 

const router = Router()


router.get('/' , async(req, res)=> {
  const notificaciones = await data.find(); 
    res.json(notificaciones);
});




router.post('/' , async (req, res)=>{    
  console.log(req.body)
  const notificaciones = new data({
   
   imagen:req.body.imagen,
   categoria:req.body.categoria,
   titulo:req.body.titulo,
   subtitulo:req.body.subtitulo,
   cuerpo:req.body.cuerpo,
   vistas:req.body.vistas,           

 });
    await notificaciones.save();
    res.json('Articulo creado!');
 })
 

 router.get('/:_id' , async(req,res) => { 

  try {
      const notificacion = await data.findById(req.params._id)    
            res.json(notificacion)               
    } catch (err) {
      res.json('ID no encontrado..')
    }

});

router.delete('/:_id', async (req,res) => {
  const { _id } = req.params;
    await data.findByIdAndDelete(_id);
      res.json("Eliminado!");
});


router.put('/:_id', async (req,res) => {
  const { _id } = req.params;
  const notificacion = {         
    imagen:req.body.imagen,
    categoria:req.body.categoria,
    titulo:req.body.titulo,
    subtitulo:req.body.subtitulo,
    cuerpo:req.body.cuerpo,
    vistas:req.body.vistas,     
   
              };
  
     await data.findByIdAndUpdate(_id, {$set: notificacion}, {new: true});
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
