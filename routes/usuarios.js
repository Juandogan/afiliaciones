const { Router } = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const router = Router()
const emailer = require('../controllers/mails')
//
//verifyToken  usuar luego de la ruta para veriicar usuarios
router.get('/' ,verifyToken, async(req, res)=> {

  const usuarios = await User.find(); 
    res.json(usuarios);

});

 
router.get('/:_id' , async(req,res) => { 
    console.log(req.params._id)
    try {
        const user = await User.findById(req.params._id)    
        res.json(user)
               
      } catch (err) {
        res.json('ID no encontrado..')
      }

});

    

router.delete('/:_id', async (req,res) => {
    const { _id } = req.params;
      await User.findByIdAndDelete(_id);
        res.json("Eliminado!");
  });



router.post('/signup' , async (req, res)=>{    
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


router.post('/signin', async (req,res)=>{
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
 



router.put('/:_id', async (req,res) => {
    const { _id } = req.params;
    const articulo = { 
                email:req.body.email,
                password:req.body.password, 
                role:req.body.role,
                nombre:req.body.nombre,
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
