
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
dotenv.config()

class Email {
  constructor(smtpConfig) {
    let smtpObj = {};    
    smtpObj = this.getDefaultSmtpConfig();
    this.transporter = nodemailer.createTransport(smtpObj);
  }

  send(mailOptions) {
    return new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          }
          console.log('info', info);
          resolve(info);
        });
    });
  }
  getDefaultSmtpConfig() {
    return {
      'host': 'smtp.gmail.com',
      'secure': true,
      'port': 465,
      'auth': {
        'user': process.env.GMAIL_EMAIL,
        'pass': process.env.GMAIL_PASSWORD,
      },
    };
  }
}

module.exports = Email;
