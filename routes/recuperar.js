const { Router } = require('express');
const User = require('../models/userModel')
const router = Router()
const emailer = require('../controllers/mailsrec')

  
router.get('/:_id' , async(req,res) => { 
    try { 
        const data = await User.findOne({email:(req.params._id)})    
        if(!data){
          return res.status(400).send('errorUsuario');
        }

        emailer.sendMailrec(data)
        return res.json({"msj":"mail enviado"})


                   
      } catch (err) {
     return res.status(400).send('Error de conexion');
      }   

}); 



module.exports = router