const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.post('/mail', async(req, res)=>{
    const{nombre, email, msj} = req.body;
    try {
        var transport = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });
        if(email.length > 0 && msj.length > 0) {
          //MAIL
          const mail = await transport.sendMail({
            from: `"Portfolio" <${email}>`,
            to: process.env.EMAIL_USER,
            subject: "Enviado desde portfolio",
            text: `Hola soy ${nombre}. Mi email es ${email}. ${msj}.`
          });
          res.send('Su mensaje fue enviado!');
        }
    } catch (error) {
      res.send('Lo sentimos. Su mensaje no pudo ser enviado...');
    }
});
