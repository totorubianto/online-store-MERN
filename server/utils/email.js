const nodemailer = require('nodemailer');

const forgotPassword = (subject, password) =>
  `<!DOCTYPE html>
    <html>
    <head>
        <title>email nyatakan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap-grid.css">
        <style type="text/css">
    
            @import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
            @import url('https://fonts.googleapis.com/css?family=Caveat&display=swap');
            body{
                background-color: #F0F0F5;
                font-family: 'Muli', sans-serif;
    
            }
            .shadow{
                -webkit-box-shadow: 0px 0px 84px 0px rgba(240,240,240,1);
                -moz-box-shadow: 0px 0px 84px 0px rgba(240,240,240,1);
                box-shadow: 0px 0px 84px 0px rgba(240,240,240,1);
                background-color: white;
                border-radius: 5px;
            }
            .logo{
                
                padding-bottom: 40px;
            }
            .title{
                font-size: 25px;
                margin: 0px;
            }
            b{
                color: black;
                padding-bottom: 10px;
            }
            .padding-20{
                padding: 20px;
            }
            hr{
                border-top: 0.1px solid #EBEFF4;
                margin: 0px;
            }
            p{
                margin:0px;
                line-height: 25px;
            }
            .block{
                background-color: #E0E0F0;
                margin-top: 20px;
                border-radius: 5px;
                padding: 15px 20px;
                text-align: center;
            }
            .description{
                color: #768F93;
            }
            .ttd{
                font-family: 'Caveat', cursive;
                font-size: 20px;
            }
            .flex-space-between{
                display: flex;
                justify-content: space-between;
    
                width:100%;
            }
            .margin-top-20{
                margin-top: 20px;
            }
            .line{
                height: 5px;
                width: 100%;
                background-image: url('assets/line.svg');
                background-size: cover;
            }
            .button{
                display: inline-block;
                background-color: #F06C8C;
                color: white;
                padding: 15px 50px;
                margin-top: 20px;
                border-radius: 5px;
                text-decoration: none;
            }
            .flex-center{
                display: flex;
                justify-content: center;
            }
            .category{
                padding: 5px 20px;
                background-color: #4BD4E7;
                color: white;
                border-radius: 5px;
                height: 30px;
            }
            .margin-top-60{
                margin-top: 60px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="row margin-top-60">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="shadow">
                        <div class="padding-20">
                            <div class="flex-space-between">
                                <img class="logo" width="150px" src="assets/Vector.svg">
                                
                                <span class="category">Akun</span>
                            </div>
                            <span class="title">Reset Password?</span>
                        </div>
    
                        <hr>
                        <div class="padding-20">
                            <p class="description">
                                <b>${subject}</b> <br>
    
                                Permohonan pergantian password anda telah diproses untuk login
                                gunakan password dibawah ini 
                            </p>
                            <div class="block">
                                ${password}
                            </div>
                            <div class="flex-center">
                                <a class="button" href="">Login</a>
                            </div>
                            
                        </div>
                        <hr>
                        <div class="padding-20">
                            <div class="ttd ">
                                <p>Have Nice Day!!!</p>
                            </div>
                            <p class="description margin-top-20">Nyatakan Team</p>
                        </div>
                        <div class="line">
                            
                        </div>
                    </div>
    
                </div>
                <div class="col-md-2"></div>
            </div>
            
        </div>
        
    </body>
  </html>`;
const connectMail = (key, email, password) => {
  return new Promise((resolve, reject) => {
    try {
      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'toto.rubianto.17@gmail.com',
          pass: 'ulum1701'
        }
      });

      const mailOptions = {
        from: 'toto.rubianto.17@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Online Store', // Subject line
        html: forgotPassword('Forgot Password', password)
      };
      transporter.sendMail(mailOptions);
      successMSG = {
        data: 'Success Mail Send'
      };
      resolve(successMSG);
    } catch (error) {
      errorMSG = {
        error: 'Email not set'
      };
      reject(errorMSG);
    }
  });
};

module.exports = connectMail;
