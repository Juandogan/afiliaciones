const { } = require('express');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')


const createTrans = () => {
    let transporter = nodemailer.createTransport({
      // host: "sandbox.smtp.mailtrap.io",
      // port: 2525,
      // auth: {
      //   user: "baec027dce6041",
      //   pass: "f7a9c4737a9a84"
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "juandogan@gmail.com",
        pass: "zkdfodnqvtiijvzx"
        
      }
  
  
    });
  
    return transporter
  }

const sendMailrec = async (user) => {

    const token = jwt.sign({ _id: user._id, role: user.role }, 'secretKey')
    const transporter = createTrans()
    const info = await transporter.sendMail({
      from: '"FEVA" <foo@example.com>', // sender address
      to: `${user.email}`, // list of receivers
      subject: `Recuperacion de tu cuenta FEVA`, // Subject line
      text: "Hello world?", // plain text body          http:///ingresar
      html: `ingrese al siguiente link para recuperar su contraseña: <a href="http://66.97.44.139/feva/recuperarForm/${token}">Recuperar contraseña </a>` // html body
    })
  
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return
  }

  exports.sendMailrec = (user) => sendMailrec(user)