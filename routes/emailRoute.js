const app = require('express') 
 
 
let envio = require('../controllers/mails')

app.post('/envio', envio.envioCorreo)

module.exports = app;