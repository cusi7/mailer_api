const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get('/api', (req, res) => {
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.send('Buenas buenas!!!')
});

app.post('/mail', async(req, res)=>{
    const{nombre, email, msj} = req.body;
    try {
        const transport = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          transport.verify(function (error, success) {
            if (error) {
              console.log(error);
            } else {
              console.log("Server is ready to take our messages");
            }
          });

        if(email.length > 0 && msj.length > 0) {
          //MAIL
          const mail = await transport.sendMail({
            from: `"Portfolio" <${email}>`,
            to: 'cusijuarez07@gmail.com',
            subject: "Enviado desde portfolio",
            text: `Hola soy ${nombre || 'NN'}. Mi email es ${email}. ${msj}.`
          });
          res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
          res.send('Su mensaje fue enviado!');
        }
    } catch (error) {
      res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
      res.send('Lo sentimos. Su mensaje no pudo ser enviado...');
    }
});

app.listen(3001, () => {
    console.log("Listen in Port 3001")
});

module.exports = app;